import { NextRequest, NextResponse } from "next/server";

const GAS_URL = process.env.GAS_WEBAPP_URL!;     // e.g. https://script.google.com/macros/s/XXXXX/exec
const SHARED_TOKEN = process.env.SHARED_TOKEN!;  // same as in Apps Script

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic server-side validation (mirror your client rules)
    const required = ["firstName","lastName","email","organization","teamSize","message"];
    for (const k of required) {
      if (!data[k] || String(data[k]).trim() === "") {
        return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 });
      }
    }

    // Optional: capture user agent & IP for audit
    const userAgent = req.headers.get("user-agent") || "";
    const ip = req.headers.get("x-forwarded-for") || req.ip || "";

    const payload = {
      ...data,
      token: SHARED_TOKEN,
      userAgent,
      ip,
    };

    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // No need to forward credentials/cookies
    });

    const body = await res.json();
    if (!body.ok) {
      return NextResponse.json({ ok: false, error: body.error || "Sheet write failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
