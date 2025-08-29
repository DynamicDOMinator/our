import "../fonts/font-imports.css";
import "../globals.css";
import { metadata, viewport } from "./metadata";

export { metadata, viewport };

export default function ArabicLandingLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}