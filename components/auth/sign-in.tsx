"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export function SignIn() {
  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome to Synapse
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue to your workspace
          </p>
        </div>
        <Button onClick={handleSignIn} size="lg">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
