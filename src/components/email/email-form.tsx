'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { LoaderIcon, MailIcon } from 'lucide-react';
import { useActionState, useEffect, useId } from 'react';
import { toast } from 'sonner';

export default function EmailForm() {
  const [state, formAction, pending] = useActionState(sendEmail, undefined);
  const id = useId();

  useEffect(() => {
    if (state && state.message) {
      if (state.success) {
        toast.success(state.message);
      } else if (state.errors) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form className="space-y-6" action={formAction}>
      <div className="flex gap-4 lg:gap-8">
        <div className="w-full space-y-2">
          <Label htmlFor={`${id}-firstName`}>First Name</Label>
          <Input
            className={
              state?.errors?.firstName &&
              'border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            }
            type="text"
            id={`${id}-firstName`}
            name="firstName"
            defaultValue={state?.inputs?.firstName}
            aria-describedby={`${id}-firstName-error`}
          />
          {state?.errors?.firstName && (
            <p
              id={`${id}-firstName-error`}
              className="text-destructive text-xs lg:text-sm"
            >
              {state.errors.firstName}
            </p>
          )}
        </div>
        <div className="w-full space-y-2">
          <Label htmlFor={`${id}-lastName`}>Last Name</Label>
          <Input
            className={
              state?.errors?.lastName &&
              'border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
            }
            type="text"
            id={`${id}-lastName`}
            name="lastName"
            defaultValue={state?.inputs?.lastName}
            aria-describedby={`${id}-lastName-error`}
          />
          {state?.errors?.lastName && (
            <p
              id={`${id}-lastName-error`}
              className="text-destructive text-xs lg:text-sm"
            >
              {state.errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-email`}>Email</Label>
        <Input
          className={
            state?.errors?.email &&
            'border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          }
          type="email"
          id={`${id}-email`}
          name="email"
          defaultValue={state?.inputs?.email}
          aria-describedby={`${id}-email-error`}
        />
        {state?.errors?.email && (
          <p
            id={`${id}-email-error`}
            className="text-destructive text-xs lg:text-sm"
          >
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${id}-message`}>Message</Label>
        <Textarea
          className={cn(
            'resize-none',
            state?.errors?.message &&
              'border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/30'
          )}
          id={`${id}-message`}
          name="message"
          defaultValue={state?.inputs?.message}
          aria-describedby={`${id}-message-error`}
        />
        {state?.errors?.message && (
          <p
            id={`${id}-message-error`}
            className="text-destructive text-xs lg:text-sm"
          >
            {state.errors.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? <LoaderIcon className="animate-spin" /> : <MailIcon />}
          <span>Send</span>
        </Button>
      </div>
    </form>
  );
}
