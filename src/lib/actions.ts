'use server';

import { z } from 'zod';

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required.',
    })
    .max(20, {
      message: 'Character must be less than 30 characters,',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required.',
    })
    .max(20, {
      message: 'Character must be less than 30 characters,',
    }),
  email: z.string().email({
    message: 'Please enter your email so I can get back to you.',
  }),
  message: z
    .string()
    .min(1, {
      message: 'Message is required.',
    })
    .max(500, {
      message: 'Message must be less than 500 characters.',
    }),
});

export type State =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        message?: string[];
      };
    }
  | undefined;

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://ausathikram.vercel.app'
    : 'http://localhost:3000';

export async function sendEmail(prevState: State, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${url}/api/send`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Failed to send email.',
      };
    }

    return {
      success: true,
      message:
        'Thank you for reaching out to me! I will get back to you as soon as possible.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: 'Failed to send email.',
    };
  }
}
