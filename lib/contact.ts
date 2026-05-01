const whatsappNumber = "916362539200"; // replace with Swasthi's number
const instagramUsername = "direct/t/18059058620440846/"; // replace with real username
const emailAddress = "loopbelle@gmail.com"; // replace with real email

export function getWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getInstagramLink() {
  return `https://instagram.com/${instagramUsername}`;
}

export function getEmailLink(subject: string, body: string) {
  return `mailto:${emailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}