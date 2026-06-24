export type Granularidad = "baja" | "media" | "alta"

export interface Chunk {
  type: string
  heading?: string
  content: string
}

/**
 * Extrae chunks semánticos de un HTML según la granularidad.
 * - baja: por H1/H2
 * - media: por H2/H3/H4
 * - alta: por párrafo
 */
export function extractSemanticChunks(html: string, granularidad: Granularidad = "media"): Chunk[] {
  // Tolerancia a HTML mal cerrado: intenta parsear lo mejor posible
  let doc: Document
  try {
    doc = new DOMParser().parseFromString(html, "text/html")
  } catch {
    // fallback: crea un div y mete el HTML
    const div = document.createElement("div")
    div.innerHTML = html
    doc = document.implementation.createHTMLDocument("")
    doc.body.append(...Array.from(div.childNodes))
  }
  const chunks: Chunk[] = []

  // Título y H1 como chunk principal
  const title = doc.title || ""
  const h1 = doc.querySelector("h1")?.textContent || ""
  if (title || h1) {
    chunks.push({ type: "primary_topic", content: `${title} ${h1}`.trim() })
  }

  if (granularidad === "baja") {
    // Chunks por H1/H2
    const headings = doc.querySelectorAll("h1, h2")
    headings.forEach(heading => {
      let content = heading.textContent || ""
      let sibling = heading.nextElementSibling
      let sectionContent = ""
      while (sibling && !["H1", "H2"].includes(sibling.tagName)) {
        if (sibling.textContent) {
          sectionContent += " " + sibling.textContent
        }
        sibling = sibling.nextElementSibling
      }
      if (sectionContent.trim()) {
        chunks.push({
          type: "section",
          heading: content,
          content: sectionContent.trim().substring(0, 1000)
        })
      }
    })
  } else if (granularidad === "media") {
    // Chunks por H2/H3/H4
    const headings = doc.querySelectorAll("h2, h3, h4")
    headings.forEach(heading => {
      let content = heading.textContent || ""
      let sibling = heading.nextElementSibling
      let sectionContent = ""
      while (sibling && !["H1", "H2", "H3", "H4"].includes(sibling.tagName)) {
        if (sibling.textContent) {
          sectionContent += " " + sibling.textContent
        }
        sibling = sibling.nextElementSibling
      }
      if (sectionContent.trim()) {
        chunks.push({
          type: "section",
          heading: content,
          content: sectionContent.trim().substring(0, 1000)
        })
      }
    })
  } else if (granularidad === "alta") {
    // Recoge todos los <p> con texto relevante, aunque estén anidados
    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach(p => {
      const text = p.textContent?.trim();
      if (text && text.length > 20) {
        chunks.push({
          type: "paragraph",
          content: text.substring(0, 1000)
        });
      }
    });

    // También recoge <h2>, <h3>, <h4> con solo texto y sin <p> hijos
    const headings = doc.querySelectorAll("h2, h3, h4");
    headings.forEach(h => {
      const text = h.textContent?.trim();
      if (text && text.length > 20 && h.querySelectorAll("p").length === 0) {
        chunks.push({
          type: "heading",
          heading: h.tagName,
          content: text.substring(0, 1000)
        });
      }
    });
  }

  return chunks
} 