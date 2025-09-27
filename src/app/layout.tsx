import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--fonts-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--fonts-geist-mono",
    subsets: ["latin"],
});

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

        // ✅ favicon always served from your own API route proxy
        icons: {
            icon: "/api/github-avatar",
            shortcut: "/api/github-avatar",
            apple: "/api/github-avatar",
        },

        // ✅ Open Graph (social link previews)
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

        // ✅ Twitter cards
        twitter: {
            card: "summary_large_image",
            title: SITE_CONFIG.title,
            description: SITE_CONFIG.description,
            images: avatarUrl ? [avatarUrl] : [SITE_CONFIG.image],
        },

        // ✅ JSON-LD embedded schema
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
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}