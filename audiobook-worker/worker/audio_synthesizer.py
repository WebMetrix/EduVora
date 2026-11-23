import asyncio
from pathlib import Path
import edge_tts
from mutagen.id3 import ID3, APIC, TIT2, TPE1, TALB, TRCK, TCOP, TPUB, COMM, ID3NoHeaderError
from mutagen.mp3 import MP3
from worker.config import (
    TTS_VOICE,
    TTS_RATE,
    COVER_ART_PATH,
    AUDIO_WATERMARK_PHRASE,
)


def synthesize_script_to_mp3(
    script_text: str,
    out_mp3: Path,
    course_title: str,
    chapter_title: str,
    chapter_num: int,
    voice: str = TTS_VOICE,
    rate: str = TTS_RATE,
    buyer_license: str | None = None,
) -> int:
    """Convert narration script to MP3, inject sonic watermark, and embed EduVora cover art."""
    out_mp3.parent.mkdir(parents=True, exist_ok=True)

    narration = script_text.replace("[EDUVORA_WATERMARK]", AUDIO_WATERMARK_PHRASE)
    if buyer_license:
        narration = (
            f"This EduVora audiobook copy is licensed exclusively to {buyer_license}.\n\n"
            + narration
        )

    async def _run():
        communicate = edge_tts.Communicate(text=narration, voice=voice, rate=rate)
        await communicate.save(str(out_mp3))

    asyncio.run(_run())

    # Embed ID3 metadata & EduVora logo cover art
    try:
        tags = ID3(str(out_mp3))
    except ID3NoHeaderError:
        tags = ID3()

    tags["TIT2"] = TIT2(encoding=3, text=chapter_title)
    tags["TPE1"] = TPE1(encoding=3, text="EduVora — Learn • Grow • Earn")
    tags["TALB"] = TALB(encoding=3, text=course_title)
    tags["TPUB"] = TPUB(encoding=3, text="EduVora")
    tags["TCOP"] = TCOP(encoding=3, text="© EduVora. All rights reserved.")
    tags["TRCK"] = TRCK(encoding=3, text=str(chapter_num))

    if buyer_license:
        tags["COMM"] = COMM(encoding=3, lang="eng", desc="License", text=f"Licensed to: {buyer_license}")

    if COVER_ART_PATH.exists():
        tags["APIC"] = APIC(
            encoding=3,
            mime="image/jpeg",
            type=3,  # Front Cover
            desc="EduVora Logo",
            data=COVER_ART_PATH.read_bytes(),
        )

    tags.save(str(out_mp3))
    return int(round(MP3(str(out_mp3)).info.length))
