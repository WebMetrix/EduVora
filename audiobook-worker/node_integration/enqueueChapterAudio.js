/**
 * Express.js / Node.js RabbitMQ Producer for EduVora Audiobook Worker
 * Publishes a Celery v2 protocol JSON message to `chapter_audio_jobs`.
 *
 * Install: npm install amqplib
 */
import amqp from "amqplib";
import { randomUUID } from "crypto";

export async function enqueueChapterAudioJob({
  job_id,
  course_id,
  course_title,
  chapter_number,
  chapter_title,
  source_pdf_path,
  voice = null,
  rate = null,
}) {
  const rabbitUrl = process.env.RABBITMQ_URL;
  const queue = process.env.CELERY_QUEUE || "chapter_audio_jobs";

  const conn = await amqp.connect(rabbitUrl);
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });

  const kwargs = {
    job_id,
    course_id,
    course_title,
    chapter_number,
    chapter_title,
    source_pdf_path,
    ...(voice ? { voice } : {}),
    ...(rate ? { rate } : {}),
  };

  // Celery v2 protocol payload: [args, kwargs, embed]
  const body = JSON.stringify([
    [],
    kwargs,
    { callbacks: null, errbacks: null, chain: null, chord: null },
  ]);

  ch.sendToQueue(queue, Buffer.from(body), {
    persistent: true,
    contentType: "application/json",
    contentEncoding: "utf-8",
    headers: {
      lang: "py",
      task: "worker.tasks.process_chapter_pdf",
      id: randomUUID(),
      root_id: job_id,
    },
  });

  await ch.close();
  await conn.close();
}
