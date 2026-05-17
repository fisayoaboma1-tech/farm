import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const total = messages.length;
    const unread = messages.filter((m) => !m.read).length;
    const thisMonth = messages.filter(
      (m) =>
        new Date(m.created_at).getMonth() === new Date().getMonth() &&
        new Date(m.created_at).getFullYear() === new Date().getFullYear()
    ).length;

    return NextResponse.json({ messages, stats: { total, unread, thisMonth } });
  } catch (err) {
    console.error("Supabase fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, description } = body;

    if (!name || !email || !subject || !description) {
      return NextResponse.json(
        { error: "Name, email, subject, and description are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          description,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Supabase insert error:", err);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, read } = await request.json();

    const { data, error } = await supabase
      .from("contact_messages")
      .update({ read })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Supabase update error:", err);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}