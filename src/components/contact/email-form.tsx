"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Loader, Mail } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function EmailForm() {
  const [state, formAction, pending] = useActionState(sendEmail, undefined);

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => formAction(new FormData(event.currentTarget)));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-8">
        <div className="w-full space-y-2">
          <Label className="text-primary" htmlFor="firstName">
            First Name
          </Label>
          <Input
            className={
              state?.errors?.firstName &&
              "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
            }
            type="text"
            id="firstName"
            name="firstName"
          />
          {state?.errors?.firstName && (
            <p className="text-destructive text-sm">{state.errors.firstName}</p>
          )}
        </div>
        <div className="w-full space-y-2">
          <Label className="text-primary" htmlFor="lastName">
            Last Name
          </Label>
          <Input
            className={
              state?.errors?.lastName &&
              "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
            }
            type="text"
            id="lastName"
            name="lastName"
          />
          {state?.errors?.lastName && (
            <p className="text-destructive text-sm">{state.errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="email">
          Email
        </Label>
        <Input
          className={
            state?.errors?.email &&
            "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
          }
          type="email"
          id="email"
          name="email"
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-primary" htmlFor="message">
          Message
        </Label>
        <Textarea
          className={cn(
            "resize-none",
            state?.errors?.message &&
              "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30"
          )}
          id="message"
          name="message"
        />
        {state?.errors?.message && (
          <p className="text-destructive text-sm">{state.errors.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader className="animate-spin" /> : <Mail />}
          <span>Send</span>
        </Button>
      </div>
    </form>
  );
}
