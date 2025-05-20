'use client';

import { MastraChat } from '@mastra/chat';
import { useAuth } from '@clerk/nextjs';

import "@mastra/chat/dist/styles.css";

export default function Weather() {
  const { getToken } = useAuth();

  return (
    <MastraChat
      agentId="weatherAgent"
      getToken={getToken}
    />
  )
}
