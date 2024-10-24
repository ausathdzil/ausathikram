'use server';

import { z } from 'zod';

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'first name is required.',
    })
    .max(20, {
      message: 'character must be less than 30 characters,',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'last name is required.',
    })
    .max(20, {
      message: 'character must be less than 30 characters,',
    }),
  email: z.string().email({
    message: 'please enter your email so I can get back to you.',
  }),
  message: z
    .string()
    .min(1, {
      message: 'message is required.',
    })
    .max(500, {
      message: 'message must be less than 500 characters.',
    }),
});

export type State =
  | {
      success: boolean;
      message?: string | null;
      error?: {
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
      message: 'invalid form fields.',
      error: validatedFields.error.flatten().fieldErrors,
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
        message: 'failed to send email.',
      };
    }

    return {
      success: true,
      message:
        'thank you for reaching out to me! i will get back to you as soon as possible.',
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
      message: 'failed to send email.',
    };
  }
}
