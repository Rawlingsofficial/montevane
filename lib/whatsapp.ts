/** Click-to-chat link with a pre-filled message. */
export function waHref(number: string, message: string): string {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
