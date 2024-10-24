import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  message,
}) => (
  <div>
    <p>
      Email from <strong>{firstName} {lastName}</strong>
    </p>
    <p>Sender email: {email}</p>
    <p>Message:</p>
    <p>{message}</p>
  </div>
);
