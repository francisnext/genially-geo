import { NextRequest, NextResponse } from "next/server";
import { fetchKeywordIdeas, isDataforseoConfigured } from "@/lib/dataforseo";

export async function POST(request: NextRequest) {
  if (!isDataforseoConfigured()) {
    return NextResponse.json(
      { error: "DATAFORSEO_API_KEY is not configured. Add it to .env.local." },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      keyword?: unknown;
      locationCode?: unknown;
      languageCode?: unknown;
      limit?: unknown;
    };
    const keyword = typeof body.keyword === "string" ? body.keyword.trim() : "";
    if (!keyword) {
      return NextResponse.json(
        { error: "Missing or invalid 'keyword' in body." },
        { status: 400 }
      );
    }

    const locationCodeRaw =
      typeof body.locationCode === "number"
        ? body.locationCode
        : typeof body.locationCode === "string"
          ? Number(body.locationCode)
          : Number.NaN;
    const locationCode = Number.isFinite(locationCodeRaw) ? Math.floor(locationCodeRaw) : 2840;
    const languageCode =
      typeof body.languageCode === "string" && body.languageCode.trim().length > 0
        ? body.languageCode.trim().toLowerCase()
        : "en";
    const limitRaw =
      typeof body.limit === "number"
        ? body.limit
        : typeof body.limit === "string"
          ? Number(body.limit)
          : Number.NaN;
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.floor(limitRaw), 1), 700) : 50;

    const items = await fetchKeywordIdeas(keyword, locationCode, languageCode, limit);
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Keyword research failed.";
    const lower = message.toLowerCase();
    const status = lower.includes("missing or invalid")
      ? 400
      : lower.includes("unauthorized") || lower.includes("forbidden")
        ? 401
        : lower.includes("too many requests") || lower.includes("rate limit")
          ? 429
          : lower.includes("insufficient") || lower.includes("payment")
            ? 402
            : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
