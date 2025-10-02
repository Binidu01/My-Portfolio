import { NextResponse } from "next/server";

// Only the confirmed working APIs are included.
const QUOTE_APIS = [
    // 1. ZenQuotes: [{q: '...', a: '...'}]
    "https://zenquotes.io/api/random",

    // 2. Programming Quotes (vercel.app): {id: '...', author: '...', quote: '...'}
    "https://programming-quotesapi.vercel.app/api/random",

    // 3. Chuck Norris Jokes: {value: '...'}
    "https://api.chucknorris.io/jokes/random",

    // 4. Kanye Rest: {quote: '...'}
    "https://api.kanye.rest/",

    // 5. Ron Swanson Quotes: ['quote as string']
    "https://ron-swanson-quotes.herokuapp.com/v2/quotes",

    // 6. Forismatic: {quoteText: '...', quoteAuthor: '...'}
    // Note: This API often fails due to the lack of HTTPS, but is included as requested.
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",

    // 7. Advice Slip: {slip: {advice: '...'}}
    "https://api.adviceslip.com/advice",
];

export async function GET() {
    for (const apiUrl of QUOTE_APIS) {
        try {
            const res = await fetch(apiUrl);

            // Skip if the response isn't successful (e.g., 404, 500, or rate-limited)
            if (!res.ok) {
                continue;
            }

            const data = await res.json();
            let content, author;

            // --- Optimized Quote Extraction Logic ---

            // 1. ZenQuotes: [{q: '...', a: '...'}]
            if (Array.isArray(data) && data[0]?.q && data[0]?.a) {
                content = data[0].q;
                author = data[0].a;
            }
            // 2. Programming Quotes (vercel.app): {quote: '...', author: '...'}
            else if (data?.quote && data?.author) {
                content = data.quote;
                author = data.author;
            }
            // 3. Forismatic: {quoteText: '...', quoteAuthor: '...'}
            else if (data?.quoteText && data?.quoteAuthor) {
                content = data.quoteText.trim();
                author = data.quoteAuthor.trim() || "Unknown";
            }
            // 4. Chuck Norris Jokes: {value: '...'}
            else if (data?.value) {
                content = data.value;
                author = "Chuck Norris";
            }
            // 5. Kanye Rest: {quote: '...'}
            else if (data?.quote) {
                content = data.quote;
                author = "Kanye West";
            }
            // 6. Ron Swanson Quotes: ['quote as string']
            else if (Array.isArray(data) && typeof data[0] === 'string' && apiUrl.includes("ron-swanson")) {
                content = data[0];
                author = "Ron Swanson";
            }
            // 7. Advice Slip: {slip: {advice: '...'}}
            else if (data?.slip?.advice) {
                content = data.slip.advice;
                author = "Advice Slip";
            }

            // If content and author were successfully set, return the standardized response
            if (content && author) {
                return NextResponse.json({
                    content: content,
                    author: author
                });
            }

        } catch (e) {
            // Log the 'e' variable for better debugging (fixes the ESLint warning).
            console.error(`API ${apiUrl} failed to fetch or parse. Error:`, e);
            // The loop will automatically continue to the next API
        }
    }

    // Fallback response if all providers fail
    return NextResponse.json(
        {
            content: "The greatest failure is the failure to try, but our APIs failed anyway.",
            author: "The Fallback Quote Bot"
        },
        { status: 500 }
    );
}