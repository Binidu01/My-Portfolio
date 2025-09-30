// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { MarqueeTitle } from "@/components/MarqueeTitle";
import { SpeedInsights } from "@vercel/speed-insights/next";

// --- SITE CONFIG ---
const SITE_CONFIG = {
    name: "Binidu Ranasinghe",
    title: "Binidu Ranasinghe | Full-Stack Developer & AI Enthusiast",
    description:
        "Full-stack developer specializing in React, Next.js, Node.js, and AI systems. Building modern applications with exceptional user experience.",
    url: "https://binidu.dev",
    image: "/og-image.jpg",
    github: "Binidu01",
};

// --- DYNAMIC METADATA ---
export async function generateMetadata(): Promise<Metadata> {
    let avatarUrl: string | undefined;

    try {
        const res = await fetch(`https://api.github.com/users/${SITE_CONFIG.github}`, {
            headers: { "User-Agent": "next-app" },
            next: { revalidate: 3600 }, // Revalidate every 1 hour
        });
        if (res.ok) {
            const data = await res.json();
            avatarUrl = data.avatar_url;
        }
    } catch (err) {
        console.error("❌ Failed to fetch GitHub avatar:", err);
    }

    return {
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        robots: {
            index: false, // prevent indexing if desired
            follow: true,
            nocache: true,
            googleBot: {
                index: false,
                follow: true,
            },
        },
        alternates: {
            canonical: SITE_CONFIG.url,
        },
        icons: {
            icon: "/favicon.ico",
            apple: "/favicon.ico",
        },
        openGraph: {
            type: "website",
            url: SITE_CONFIG.url,
            siteName: SITE_CONFIG.name,
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: [
                avatarUrl
                    ? { url: avatarUrl, width: 400, height: 400, alt: "GitHub Avatar" }
                    : { url: SITE_CONFIG.image, width: 1200, height: 630, alt: "Portfolio OG Image" },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: [avatarUrl ?? SITE_CONFIG.image],
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

// --- ROOT LAYOUT ---
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="antialiased bg-black text-white">
        <MarqueeTitle baseTitle={SITE_CONFIG.title} />
        {children}
        <SpeedInsights />
        </body>
        </html>
    );
}
