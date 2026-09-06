import crypto from 'crypto';

// Parse RabbitMQ connection details from the environment variable
const parseRabbitMqUrl = (url) => {
    // amqp://user:password@host:5672/vhost — we only need host, credentials, and vhost
    // port 5672 is AMQP (used by Python worker), we use 15672 (HTTP Management API) separately
    const parsed = new URL(url);
    return {
        host: parsed.hostname,
        user: parsed.username,
        password: parsed.password,
        vhost: parsed.pathname.replace('/', '') // strip the leading slash
    };
};

/**
 * Publishes a Celery task directly to RabbitMQ using its native HTTP Management API.
 * This completely avoids the need to install `amqplib`.
 */
export const publishKycTask = async (userUuid, identityProofType, identityProofFrontPath, identityProofBackPath, panCardPath) => {
    try {
        // Parse the config from RABBITMQ_URL (same .env var used by the Python worker)
        const { host, user, password, vhost } = parseRabbitMqUrl(process.env.RABBITMQ_URL);
        
        // RabbitMQ Management HTTP API endpoint - uses port 15672 not 5672
        const url = `http://${host}:15672/api/exchanges/${encodeURIComponent(vhost)}/celery/publish`;
        
        // Basic Auth header
        const auth = Buffer.from(`${user}:${password}`).toString('base64');
        
        // Celery Task JSON Payload
        const taskPayload = {
            id: crypto.randomUUID(),
            task: 'tasks.process_kyc_documents',
            args: [userUuid, identityProofType, identityProofFrontPath, identityProofBackPath, panCardPath],
            kwargs: {}
        };
        
        // RabbitMQ HTTP API Request Body
        const rabbitMqBody = {
            properties: {
                content_type: 'application/json',
                content_encoding: 'utf-8',
                delivery_mode: 2, // Persistent message
                headers: {
                    id: taskPayload.id,
                    task: taskPayload.task,
                    lang: 'py'
                }
            },
            routing_key: 'celery',
            payload: JSON.stringify(taskPayload),
            payload_encoding: 'string'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rabbitMqBody)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Status ${response.status}: ${errText}`);
        }
        
        console.log(`[RabbitMQ] Successfully enqueued Celery task for UUID: ${userUuid}`);
        return true;
    } catch (error) {
        console.error(`[RabbitMQ] Failed to publish Celery task for ${userUuid}:`, error);
        return false;
    }
};
