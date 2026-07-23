import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const ENABLE_DRAFT_MODE_ROUTE = "/api/preview";

export async function middleware(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const previewRequested =
        searchParams.get("wb.preview") === "true" || searchParams.get("wb.editing") === "true";

    const requestHeaders = new Headers(request.headers);

    const tenantId = searchParams.get("wb.tenant") ?? "root";
    if (tenantId) {
        requestHeaders.set("X-Tenant", tenantId);
    }

    const previewMode = await draftMode();

    if (previewRequested) {
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });

        if (previewMode.isEnabled) {
            response.headers.set("X-Preview-Params", searchParams.toString());
            response.headers.set(
                "Cache-Control",
                "no-store, no-cache, must-revalidate, proxy-revalidate"
            );
            response.headers.set("Pragma", "no-cache");
            response.headers.set("Expires", "0");
            return response;
        }

        const url = new URL(request.url);
        url.pathname = ENABLE_DRAFT_MODE_ROUTE;

        return NextResponse.redirect(url);
    } else if (!previewRequested && previewMode.isEnabled) {
        previewMode.disable();

        return NextResponse.redirect(request.url);
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}

export const config = {
    matcher: ["/((?!_next|api|static|favicon.ico|.well-known).*)"]
};
