'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail, State } from '@/lib/actions';
import clsx from 'clsx';
import { Loader2, Mail } from 'lucide-react';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function EmailForm() {
  const initialState: State = {
    success: false,
    error: {},
    message: undefined,
  };
  const [state, formAction, pending] = useActionState(sendEmail, initialState);

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success('email sent successfully.', {
          description: state.message,
        });
      } else {
        toast.error('failed to send email.', {
          description: state.message,
        });
      }
    }
  }, [state]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(() => formAction(new FormData(event.currentTarget)));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="w-full space-y-1">
          <Label htmlFor="firstName">first name</Label>
          <Input
            className={
              state.error?.firstName &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            }
            type="text"
            id="firstName"
            name="firstName"
          />
          {state.error?.firstName && (
            <p className="text-destructive text-sm">{state.error.firstName}</p>
          )}
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="lastName">last name</Label>
          <Input
            className={
              state.error?.lastName &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            }
            type="text"
            id="lastName"
            name="lastName"
          />
          {state?.error?.lastName && (
            <p className="text-destructive text-sm">{state.error.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">email</Label>
        <Input
          className={
            state.error?.email &&
            'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          }
          type="email"
          id="email"
          name="email"
        />
        {state.error?.email && (
          <p className="text-destructive text-sm">{state.error.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="message">message</Label>
        <Textarea
          className={clsx(
            'resize-none',
            state.error?.message &&
              'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          id="message"
          name="message"
        />
        {state.error?.message && (
          <p className="text-destructive text-sm">{state.error.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : <Mail />}
          <span>send</span>
        </Button>
      </div>
    </form>
  );
}
