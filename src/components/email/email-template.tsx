import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  message,
}) => (
  <div className="space-y-4">
    <p>{message}</p>
    <p>{email}</p>
  </div>
);

export default EmailTemplate;
