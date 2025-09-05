import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic"; // avoid caching on some hosts

const GAS_URL = process.env.GAS_WEBAPP_URL!;     // e.g. https://script.google.com/macros/s/XXXXX/exec
const SHARED_TOKEN = process.env.SHARED_TOKEN!;  // same as in Apps Script

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic server-side validation (mirror client rules)
    const required = ["firstName","lastName","email","organization","teamSize","message"] as const;
    for (const k of required) {
      if (!data[k] || String(data[k]).trim() === "") {
        return NextResponse.json({ ok: false, error: `Missing ${k}` }, { status: 400 });
      }
    }

    // Capture metadata (optional)
    const userAgent = req.headers.get("user-agent") || "";
    const fwd = req.headers.get("x-forwarded-for") || "";
    const ip = (fwd.split(",")[0] || "").trim();

    const payload = {
      ...data,
      token: SHARED_TOKEN,
      userAgent,
      ip,
    };

    try {
      const response = await axios.post(GAS_URL, payload, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SHARED_TOKEN}` }
      });

      const body = response.data;

      console.log('Response:', body);
   
      return NextResponse.json({ ok: true });
      
    } catch (axiosError: any) {
      // Handle Axios specific errors
      if (axios.isAxiosError(axiosError)) {
        const statusCode = axiosError.response?.status || 500;
        const errorMessage = axiosError.response?.data?.error 
          || axiosError.message 
          || "Failed to submit form";

        console.error('Axios error:', {
          status: statusCode,
          message: errorMessage,
          details: axiosError.response?.data
        });

        return NextResponse.json(
          { ok: false, error: errorMessage },
          { status: statusCode }
        );
      }

      // Handle network errors
      if (axiosError.code === 'ECONNREFUSED' || axiosError.code === 'ENOTFOUND') {
        console.error('Network error:', axiosError);
        return NextResponse.json(
          { ok: false, error: "Unable to connect to the server" },
          { status: 503 }
        );
      }

      // Handle other errors
      console.error('Unexpected error:', axiosError);
      return NextResponse.json(
        { ok: false, error: "An unexpected error occurred" },
        { status: 500 }
      );
    }

  } catch (e: any) {
    // Handle JSON parsing errors or other request-level errors
    console.error('Request error:', e);
    return NextResponse.json(
      { ok: false, error: "Invalid request data" },
      { status: 400 }
    );
  }
}
