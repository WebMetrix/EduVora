#!/usr/bin/env python3
"""
Quick test utility to enqueue a single chapter PDF job into RabbitMQ.

Usage:
    python test_enqueue_local.py --pdf "C:\path\to\Chapter_01.pdf" --course-id 101 --course-title "AI Basics" --chapter-num 1 --chapter-title "What Is AI?"
"""

import argparse
import uuid
from worker.tasks import process_chapter_pdf


def main():
    parser = argparse.ArgumentParser(description="Enqueue a chapter PDF for audiobook generation.")
    parser.add_argument("--pdf", required=True, help="Full path to the chapter PDF")
    parser.add_argument("--course-id", type=int, default=1)
    parser.add_argument("--course-title", default="AI Basics (ChatGPT & AI Tools)")
    parser.add_argument("--chapter-num", type=int, default=1)
    parser.add_argument("--chapter-title", default="Chapter 1")
    parser.add_argument("--job-id", default=None, help="Optional GUID matching ChapterAudioJobs.JobId")
    args = parser.parse_args()

    job_id = args.job_id or str(uuid.uuid4())
    res = process_chapter_pdf.delay(
        job_id=job_id,
        course_id=args.course_id,
        course_title=args.course_title,
        chapter_number=args.chapter_num,
        chapter_title=args.chapter_title,
        source_pdf_path=args.pdf,
    )
    print(f"Enqueued job_id={job_id} | celery_task_id={res.id}")


if __name__ == "__main__":
    main()
