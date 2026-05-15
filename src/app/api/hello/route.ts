import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: "Hello from the API!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    },
  });
}