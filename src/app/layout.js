import "./fonts/font-imports.css";
import "./globals.css";

import SmoothScroll from "./components/SmoothScroll";
// Define the font stack with Arial and sans-serif as fallbacks

export const metadata = {
  title: "PROSENTAL",
  description:
    "Techshun is a full-service digital agency specializing in web and mobile app development, UI/UX design, SaaS platforms, cloud integration, and custom software. We transform innovative ideas into scalable digital experiences using cutting-edge technology and agile practices.",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
    shortcut: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
