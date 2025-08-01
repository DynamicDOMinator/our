import "./fonts/font-imports.css";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
// Define the font stack with Arial and sans-serif as fallbacks

export const metadata = {
  title: {
    default: "PROSENTAL - Creative Digital Agency",
    template: "%s | PROSENTAL"
  },
  description:
    "Techshun is a full-service digital agency specializing in web and mobile app development, UI/UX design, SaaS platforms, cloud integration, and custom software. We transform innovative ideas into scalable digital experiences using cutting-edge technology and agile practices.",
  keywords: "digital agency, web development, mobile app development, UI/UX design, SaaS platforms, cloud integration, custom software, digital experiences, technology solutions, creative agency",
  icons: {
    icon: "/fav.png",
    apple: "/fav.png",
    shortcut: "/fav.png",
  },
  openGraph: {
    title: {
      default: "PROSENTAL - Creative Digital Agency",
      template: "%s | PROSENTAL"
    },
    description: "Transforming innovative ideas into scalable digital experiences using cutting-edge technology and agile practices.",
    url: "/",
    siteName: "PROSENTAL",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
