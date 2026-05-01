export function getWhatsAppLink(message: string) {
  const phone = "916362539200"; // replace later

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}