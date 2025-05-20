import { createClient } from "@/utils/supabase/server";
import { MastraChat } from "@mastra/chat";
import { redirect } from "next/navigation";
import Weather from "@/components/weather";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div>
        <Weather token={session?.access_token} userId={user.id} />
      </div>
    </div>
  );
}
