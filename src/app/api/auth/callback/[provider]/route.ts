import { NextRequest, NextResponse } from "next/server";

// This dynamic route will match /api/auth/callback/[provider], e.g., /api/auth/callback/google
export async function GET(
  req: NextRequest,
  context: RouteContext<"/api/auth/callback/[provider]">
) {
  const { provider } = await context.params;
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log(`Request: ${req}`);

  // TODO: Add logic for handling different providers if needed

  return NextResponse.json({ provider, code, state });
}
