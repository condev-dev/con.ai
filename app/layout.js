import "./index.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://con-ai-six.vercel.app/";
const TITLE = "Con Ai — دستیار تولید محتوای شبکه های اجتماعی";
const DESC =
  "با یک توضیح کوتاه از ویدیو یا پروژه ات، برای اینستاگرام، یوتیوب شورتس، لینکدین، تردز، فیسبوک و آپارات کپشن و سناریو بگیر، به همراه پیشنهاد موزیک ترند.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Con Ai" },
  description: DESC,
  applicationName: "Con Ai",
  authors: [{ name: "Con Dev" }],
  creator: "Con Dev",
  manifest: "/manifest.json",
  keywords: [
    "تولید محتوا",
    "کپشن اینستاگرام",
    "هوش مصنوعی فارسی",
    "سناریو ویدیو",
    "شبکه های اجتماعی",
    "Con Ai",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "Con Ai",
    title: TITLE,
    description: DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Con Ai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07070c" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
  ],
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem("conai:theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
