export function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function normalizeClass(text) {
  return normalizeText(text)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-áéíóúñ]/g, "");
}