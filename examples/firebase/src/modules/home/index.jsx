import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { MastraChat } from "@mastra/chat";

export default function Home() {
  const { signOutUser, getToken } = useAuth();
  return (  
    <div className="flex flex-col items-center justify-center min-h-svh gap-4">
      <Button onClick={() => signOutUser()}>SignOut</Button>
      <MastraChat agentId="weatherAgent" getToken={getToken} />
    </div>
  );
}
