import { NextResponse } from "next/server";

const GITHUB_USER = "Binidu01";

export async function GET() {
    try {
        const res = await fetch(`https://github.com/${GITHUB_USER}.png`, {
            headers: { "User-Agent": "next-app" },
            redirect: "follow",
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`❌ Failed to fetch GitHub avatar: ${res.status} ${res.statusText}`);
            return NextResponse.json({ error: "Failed to fetch avatar" }, { status: res.status });
        }

        const buffer = Buffer.from(await res.arrayBuffer());

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (err) {
        console.error("❌ Unexpected error fetching GitHub avatar:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}