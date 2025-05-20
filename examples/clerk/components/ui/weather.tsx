'use client';

import { MastraChat } from '@mastra/chat';
import "@mastra/chat/dist/styles.css";

export default function Weather({ token, userId }: { token?: string, userId?: string }) {
  return (
    <MastraChat
      agentId="weatherAgent"
      getToken={async () => token ?? ""}
    />
  )
}
