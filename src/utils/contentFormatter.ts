export function formatContent(content: string) {
  // Escape HTML special characters
  const escaped = content.replace(/[&<>"']/g, (char) => {
    const entities: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });

  // Convert newlines to <br /> tags and wrap paragraphs in <p> tags
  return escaped
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}
