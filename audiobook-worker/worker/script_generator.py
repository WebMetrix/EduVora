from worker.config import (
    LLM_PROVIDER,
    GEMINI_API_KEY,
    GEMINI_MODEL,
    OPENAI_API_KEY,
    OPENAI_MODEL,
    AUDIO_INTRO_LINE,
    AUDIO_OUTRO_LINE,
)

TEACHER_SYSTEM_PROMPT = f"""You are an engaging, warm, practical course instructor recording an audiobook lesson for EduVora students.

Rewrite the provided chapter PDF text into a natural spoken narration script that sounds like a real teacher explaining concepts one-on-one to a student—NOT a robotic line-by-line reading of a document.

STRICT RULES:
1. OPENING: Start the script with this exact first line:
   {AUDIO_INTRO_LINE}
2. CLOSING: End the script with this exact final line:
   {AUDIO_OUTRO_LINE}
3. MID-CHAPTER WATERMARK: Insert the exact standalone marker `[EDUVORA_WATERMARK]` once near the natural midpoint of the chapter (between two major sections).
4. CONTENT FIDELITY: Cover ALL core concepts, frameworks, examples, warnings, and hands-on exercises from the source chapter—do not skip key teachings.
5. SPOKEN STYLE:
   - Convert tables, bullet lists, and callout boxes into smooth, conversational spoken sentences.
   - Use natural transitions ("Now, let's look at...", "Here is a quick pro tip...", "Think of it this way...").
   - Avoid markdown symbols (*, #, **, backticks), raw URLs with slashes, or visual references like "in the table below".
   - Keep sentences clear and easy to follow when heard aloud without looking at a screen.
   - Output ONLY the final narration script text—no commentary, headings, or stage directions.
"""


def _enforce_boundaries(script: str) -> str:
    text = script.strip()
    if not text.startswith(AUDIO_INTRO_LINE):
        text = f"{AUDIO_INTRO_LINE}\n\n{text}"
    if not text.endswith(AUDIO_OUTRO_LINE):
        text = f"{text}\n\n{AUDIO_OUTRO_LINE}"
    if "[EDUVORA_WATERMARK]" not in text:
        paras = text.split("\n\n")
        mid = max(1, len(paras) // 2)
        paras.insert(mid, "[EDUVORA_WATERMARK]")
        text = "\n\n".join(paras)
    return text


def _call_llm(user_prompt: str) -> str:
    if LLM_PROVIDER == "gemini":
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is missing in .env")
        from google import genai

        client = genai.Client(api_key=GEMINI_API_KEY)
        resp = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=user_prompt,
            config={
                "system_instruction": TEACHER_SYSTEM_PROMPT,
                "temperature": 0.6,
            },
        )
        return (resp.text or "").strip()

    if LLM_PROVIDER == "openai":
        if not OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY is missing in .env")
        from openai import OpenAI

        client = OpenAI(api_key=OPENAI_API_KEY)
        resp = client.chat.completions.create(
            model=OPENAI_MODEL,
            temperature=0.6,
            messages=[
                {"role": "system", "content": TEACHER_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        )
        return (resp.choices[0].message.content or "").strip()

    raise ValueError(f"Unsupported LLM_PROVIDER: {LLM_PROVIDER}. Use 'gemini' or 'openai'.")


def generate_teacher_script(course_title: str, chapter_title: str, raw_pdf_text: str) -> str:
    user_prompt = (
        f"Course Title: {course_title}\n"
        f"Chapter Title: {chapter_title}\n\n"
        f"--- SOURCE CHAPTER PDF CONTENT ---\n"
        f"{raw_pdf_text}\n"
        f"--- END SOURCE CONTENT ---\n\n"
        f"Write the complete teacher-style audiobook narration script now."
    )
    raw_script = _call_llm(user_prompt)
    if not raw_script:
        raise RuntimeError("LLM returned an empty narration script.")
    return _enforce_boundaries(raw_script)
