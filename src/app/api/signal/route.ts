import { NextResponse } from "next/server";
import { db } from "@/db";
import { signals } from "@/db/schema";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const callsign = String(body?.callsign ?? "").trim();
    const frequency = String(body?.frequency ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!callsign || callsign.length > 80) {
      return NextResponse.json(
        { ok: false, error: "A callsign (name) is required." },
        { status: 400 },
      );
    }
    if (!message || message.length < 4 || message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message must be 4–2000 characters." },
        { status: 400 },
      );
    }
    if (frequency && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(frequency)) {
      return NextResponse.json(
        { ok: false, error: "Frequency must be a valid email — or leave it empty." },
        { status: 400 },
      );
    }

    await db.insert(signals).values({
      callsign,
      frequency: frequency || null,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("signal error", err);
    return NextResponse.json(
      { ok: false, error: "Transmission failed. The void ate the signal." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const [row] = await db.select({ value: count() }).from(signals);
    return NextResponse.json({ ok: true, count: row?.value ?? 0 });
  } catch {
    return NextResponse.json({ ok: true, count: 0 });
  }
}
