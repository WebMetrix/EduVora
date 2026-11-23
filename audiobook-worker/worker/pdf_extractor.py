import re
from pathlib import Path
import fitz  # PyMuPDF


def extract_clean_pdf_text(pdf_path: str) -> str:
    """Extract readable text from a chapter PDF while stripping running headers/footers."""
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"Source PDF not found: {pdf_path}")

    doc = fitz.open(str(path))
    pages_text: list[str] = []

    try:
        for page in doc:
            rect = page.rect
            # Clip top 6% and bottom 6% to exclude running headers and page numbers
            clip = fitz.Rect(
                rect.x0,
                rect.y0 + rect.height * 0.06,
                rect.x1,
                rect.y1 - rect.height * 0.06,
            )
            raw = page.get_text("text", clip=clip)
            cleaned = re.sub(r"\n{3,}", "\n\n", raw).strip()
            if cleaned:
                pages_text.append(cleaned)
    finally:
        doc.close()

    return "\n\n".join(pages_text).strip()
