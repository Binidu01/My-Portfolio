// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { MarqueeTitle } from "@/components/MarqueeTitle";
import { SpeedInsights } from "@vercel/speed-insights/next";

// --- CONFIGURATION ---
const SITE_CONFIG = {
    name: "Binidu Ranasinghe",
    title: "Binidu Ranasinghe | Full-Stack Developer & AI Enthusiast",
    description:
        "Full-stack developer specializing in React, Next.js, Node.js, and AI systems. Building modern applications with exceptional user experience.",
    url: "https://binidu.dev",
    image: "/og-image.jpg",
    github: "Binidu01",
};

// --- dynamic metadata, all in one place ---
export async function generateMetadata(): Promise<Metadata> {
    let avatarUrl: string | undefined;

    try {
        const res = await fetch(`https://api.github.com/users/${SITE_CONFIG.github}`, {
            headers: { "User-Agent": "next-app" },
            next: { revalidate: 60 * 60 }, // refresh GitHub data hourly
        });
        if (res.ok) {
            const data = await res.json();
            avatarUrl = data.avatar_url;
        }
    } catch (err) {
        console.error("❌ Failed to fetch GitHub avatar", err);
    }

    return {
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,

        // --- SEO PRO ENHANCEMENT: Discourage indexing to rank below other .coms ---
        robots: {
            index: true, // Prevents search engines from indexing this page.
            follow: true,
            nocache: true,
            googleBot: {
                index: true, // Explicitly for Google
                follow: true,
            },
        },
```

        // --------------------------------------------------------------------------

        icons: {
            icon: "/api/github-avatar",
            shortcut: "/api/github-avatar",
            apple: "/api/github-avatar",
        },
        openGraph: {
            type: "website",
            url: SITE_CONFIG.url,
            siteName: SITE_CONFIG.name,
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: avatarUrl
                ? [{ url: avatarUrl, width: 400, height: 400, alt: "GitHub Avatar" }]
                : [{ url: SITE_CONFIG.image, width: 1200, height: 630, alt: "Portfolio OG Image" }],
        },
        twitter: {
            card: "summary_large_image",
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: avatarUrl ? [avatarUrl] : [SITE_CONFIG.image],
        },
        other: {
            "script:ld+json": JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: SITE_CONFIG.name,
                jobTitle: "Full-Stack Developer",
                description: SITE_CONFIG.description,
                url: SITE_CONFIG.url,
                sameAs: [`https://github.com/${SITE_CONFIG.github}`],
            }),
        },
        metadataBase: new URL(SITE_CONFIG.url),
    };
}

// --- root layout ---
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body className={`antialiased`}>
                <MarqueeTitle baseTitle={SITE_CONFIG.title} />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
