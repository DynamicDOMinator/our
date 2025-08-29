export const metadata = {
  title: "PROSENTAL - وكالة رقمية متخصصة في تطوير المواقع والتطبيقات ",
  description: "وكالة بروسنتال الرقمية تقدم خدمات تطوير المواقع الإلكترونية وتطبيقات الجوال وتصميم الهوية التجارية  احصل على حلول تقنية مبتكرة لنمو عملك.",
  keywords: [
    "تطوير مواقع",
    "تطبيقات جوال",
    "تصميم مواقع",
    "هوية تجارية",
    "تطوير تطبيقات",
    "وكالة رقمية",
    "السعودية",
    "الرياض",
    "جدة",
    "الدمام",
    "تصميم واجهة المستخدم",
    "تجربة المستخدم",
    "تسويق رقمي",
    "حلول تقنية",
    "مواقع متجاوبة",
    "تطبيقات iOS",
    "تطبيقات Android",
    "React",
    "Next.js",
    "تطوير ويب"
  ],
  authors: [{ name: "PROSENTAL" }],
  creator: "PROSENTAL",
  publisher: "PROSENTAL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://prosental.com"),
  alternates: {
    canonical: "/prosental-ar",
    alternates: {
      "ar-SA": "/prosental-ar",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "بروسنتال - وكالة رقمية متخصصة في تطوير المواقع والتطبيقات",
    description: "وكالة بروسنتال الرقمية تقدم خدمات تطوير المواقع الإلكترونية وتطبيقات الجوال وتصميم الهوية التجارية في المملكة العربية السعودية.",
    url: "https://prosental.com/prosental-ar",
    siteName: "PROSENTAL",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/og-image-ar.jpg",
        width: 1200,
        height: 630,
        alt: "بروسنتال - وكالة رقمية متخصصة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "بروسنتال - وكالة رقمية متخصصة في تطوير المواقع والتطبيقات",
    description: "وكالة بروسنتال الرقمية تقدم خدمات تطوير المواقع الإلكترونية وتطبيقات الجوال وتصميم الهوية التجارية في المملكة العربية السعودية.",
    images: ["/og-image-ar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Digital Agency",
  referrer: "origin-when-cross-origin",
  other: {
    "google-site-verification": "your-google-verification-code",
    "facebook-domain-verification": "your-facebook-verification-code",
  },
};

export const viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};