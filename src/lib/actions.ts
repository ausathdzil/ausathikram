'use server';

import { z } from 'zod';
import { url } from './utils';

const emailFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: 'First name is required.',
    })
    .max(30, {
      message: 'First name must be less than 30 characters,',
    }),
  lastName: z
    .string()
    .min(1, {
      message: 'Last name is required.',
    })
    .max(30, {
      message: 'Last name must be less than 30 characters,',
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

export type EmailFormState =
  | {
      success: boolean;
      message?: string | null;
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        message?: string[];
      };
      inputs?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        message?: string;
      };
    }
  | undefined;

export async function sendEmail(prevState: EmailFormState, formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    const validatedFields = emailFormSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Invalid form fields.',
        errors: validatedFields.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }

    const res = await fetch(`${url}/api/send`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to send email.');
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
      message: 'An unknown error occurred.',
    };
  }
}
