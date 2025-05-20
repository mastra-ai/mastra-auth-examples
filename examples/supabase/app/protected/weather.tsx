'use client';

import { createClient } from "@/utils/supabase/client";
import { MastraChat } from '@mastra/chat';

export default function Weather({ token, userId }: { token?: string, userId?: string }) {
  const supabase = createClient();

  const onSubscribe = async () => {
    const { error } = await supabase.from("users").upsert({
      id: userId,
      isAdmin: true,
    });

    if (error) {
      throw error;
    }

    return { message: "Subscribed successfully" };
  };
  
  return (
    <MastraChat
      agentId="weatherAgent"
      getToken={async () => token ?? ""}
      onSubscribe={onSubscribe}
    />
  )
}
