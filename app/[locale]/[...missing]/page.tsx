import { notFound } from "next/navigation";

// Any address the store doesn't have: show the store's own 404 (with the
// header and footer) instead of the bare framework page.
export default function Missing() {
  notFound();
}
