import "./fonts/font-imports.css";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";
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
      <head>
        {/* TikTok Pixel Code Start */}
        <Script id="tiktok-pixel" strategy="beforeInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              
              ttq.load('D28LI4BC77UAP1JBU6RG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
        {/* TikTok Pixel Code End */}
        
        {/* Google Analytics */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-66YNWC95BG" 
          strategy="afterInteractive" 
        /> 
        <Script id="google-analytics" strategy="afterInteractive"> 
          {` 
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
            gtag('config', 'G-66YNWC95BG'); 
          `} 
        </Script>
        
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '752385483861872');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=752385483861872&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
