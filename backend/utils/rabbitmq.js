import crypto from 'crypto';

/**
 * Publishes a Celery task directly to RabbitMQ using its native HTTP Management API.
 * This completely avoids the need to install `amqplib`.
 */
export const publishKycTask = async (userUuid, identityProofType, identityProofFrontPath, identityProofBackPath, panCardPath) => {
    try {
        // RabbitMQ Management HTTP API endpoint for publishing to an exchange
        // Format: /api/exchanges/{vhost}/{exchange}/publish
        const vhost = 'Dev1';
        const url = `http://15.252.27.77:15672/api/exchanges/${vhost}/celery/publish`;
        
        // Basic Auth for EduVora_KycAdmin
        const auth = Buffer.from('EduVora_KycAdmin:EduVora_KycAdmin').toString('base64');
        
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
