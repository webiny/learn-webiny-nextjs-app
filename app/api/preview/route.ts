import { draftMode, cookies } from "next/headers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("wb.path");

    const targetPathname = `${path}?${searchParams.toString()}`;

    const draft = await draftMode();
    draft.enable();

    const cookieStore = await cookies();
    const bypass = cookieStore.get("__prerender_bypass")?.value;
    const previewData = cookieStore.get("__next_preview_data")?.value;

    const headers = new Headers();

    if (bypass) {
        headers.append(
            "Set-Cookie",
            `__prerender_bypass=${bypass}; Path=/; SameSite=None; Secure; HttpOnly`
        );
    }

    if (previewData) {
        headers.append(
            "Set-Cookie",
            `__next_preview_data=${previewData}; Path=/; SameSite=None; Secure; HttpOnly`
        );
    }

    headers.set("Location", targetPathname);

    return new Response(null, {
        status: 307,
        headers
    });
}
