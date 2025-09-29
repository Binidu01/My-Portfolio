// components/MarqueeTitle.tsx (UPDATED)
"use client";

import { useEffect, useState } from "react";

// Define the expected prop type
interface MarqueeTitleProps {
    baseTitle: string;
}

/**
 * A component that creates a "marquee" or scrolling text effect
 * for the browser's title bar (the text in the tab).
 */
export function MarqueeTitle({ baseTitle }: MarqueeTitleProps) {
    // 1. Define the full static title and the scrolling speed
    // We'll use the prop and add some spaces for the scrolling effect
    const STATIC_TITLE = baseTitle + " | ";
    const scrollSpeedMs = 250;

    // 2. State to hold the currently displayed (scrolling) title
    const [scrollingTitle, setScrollingTitle] = useState(STATIC_TITLE);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const scrollTitle = () => {
            // Check to ensure the title isn't empty before trying to scroll
            if (scrollingTitle.length === 0) return;

            // Core scrolling logic
            const firstChar = scrollingTitle[0];
            const restOfString = scrollingTitle.slice(1);
            const newTitle = restOfString + firstChar;

            setScrollingTitle(newTitle);
            document.title = newTitle;

            timeoutId = setTimeout(scrollTitle, scrollSpeedMs);
        };

        timeoutId = setTimeout(scrollTitle, scrollSpeedMs);

        // Cleanup function: Clear the timeout
        return () => {
            clearTimeout(timeoutId);
        };
    }, [scrollingTitle, scrollSpeedMs]);

    return null;
}