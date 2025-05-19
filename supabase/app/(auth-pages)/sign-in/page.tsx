import { signInAction, signInWithGoogleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col gap-4">
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        
        <div className="relative flex items-center justify-center mt-2 mb-2">
          <div className="border-t border-gray-300 w-full"></div>
          <div className="bg-white px-2 text-xs text-gray-500">OR</div>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
        
        
        <FormMessage message={searchParams} />
      </div>
    </form>
    <Button 
      // pendingText="Signing in with Google..." 
      onClick={signInWithGoogleAction}
      variant="outline"
      className="flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
        <path d="M12 11v2h5.51c-.26 1.35-1.45 3.98-5.51 3.98-3.32 0-6.01-2.75-6.01-6.13 0-3.37 2.69-6.13 6.01-6.13 1.87 0 3.13.81 3.85 1.5l2.37-2.28C16.54 2.92 14.42 2 12.01 2 7.53 2 4 5.51 4 9.99s3.53 7.99 8.01 7.99c4.07 0 7.28-2.51 8.15-6.15.26-1.09.33-1.77.33-2.61 0-.43-.03-.77-.08-1.14h-8.4z" fill="currentColor"/>
      </svg>
      Sign in with Google
    </Button>
    </div>
  );
}