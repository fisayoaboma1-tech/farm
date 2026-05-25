import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tvjhottqdqovnlnsuwsb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2amhvdHRxZHFvdm5sbnN1d3NiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTY1NDgyNywiZXhwIjoyMDk1MjMwODI3fQ.Xqhf_wE9meO8_mKSK07nCXUFzI8QDdE9QqJLkeYNZEc";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.log("ERROR_LISTING: " + error.message);
    return;
  }

  const user = data.users.find((u) => u.email === "adminacess@outlook.com");
  if (user) {
    console.log("USER_UUID: " + user.id);
    console.log("USER_EMAIL: " + user.email);

    const { data: inserted, error: insErr } = await supabase
      .from("admin_users")
      .insert({ id: user.id, email: user.email, role: "admin" })
      .select();

    if (insErr) {
      console.log("INSERT_ERROR: " + insErr.message);
    } else {
      console.log("SUCCESS: Admin user created for " + user.email);
    }
  } else {
    console.log("NOT_FOUND. Emails: " + data.users.map((u) => u.email).join(", "));
  }
}

main().then(() => process.exit(0));