import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useAuth } from "@workos-inc/authkit-react";
import { Link } from "react-router-dom";
import { SignInButton } from "../components/sign-in-button";
import { MastraChat } from "@mastra/chat";

import "@mastra/chat/dist/styles.css";

export default function Index() {
  const { user, isLoading, getAccessToken } = useAuth();

  if (isLoading) {
    return "..."
  }

  return (
    <Flex direction="column" align="center" gap="2">
      {user ? (
        <>
          <Heading size="8">
            Welcome back{user?.firstName && `, ${user?.firstName}`}
          </Heading>
          <Text size="5" color="gray">
            You are now authenticated into the application
          </Text>
          <MastraChat agentId="weatherAgent" getToken={getAccessToken} />
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <Link to="/account">View account</Link>
            </Button>
            <SignInButton large />
          </Flex>
        </>
      ) : (
        <>
          <Heading size="8">AuthKit authentication example</Heading>
          <Text size="5" color="gray" mb="4">
            Sign in to view your account details
          </Text>
          <SignInButton large />
        </>
      )}
    </Flex>
  );
}
