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
    <h1>
      Email from {firstName} {lastName}
    </h1>
    <p>Sender email: {email}</p>
    <p>Message:</p>
    <p>{message}</p>
  </div>
);
