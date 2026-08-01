# EmailJS contact form setup

1. Create an EmailJS email service and connect the inbox that should receive portfolio messages.
2. Create an email template using these variables: `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`, `{{to_name}}`, `{{to_email}}`, and `{{sent_at}}`.
3. Set the template's **To Email** field to `{{to_email}}` and **Reply To** to `{{reply_to}}`.
4. Copy `.env.example` to `.env.local` and add the service ID, template ID, and public key from EmailJS.
5. In EmailJS security settings, allow only the production Netlify domain and localhost while testing.
6. Restart the development server, submit a real test message, and verify that Reply opens the visitor's email address.

Suggested subject:

```text
Portfolio message: {{subject}}
```

Suggested body:

```text
New portfolio message from {{from_name}} ({{from_email}})

{{message}}

Sent at {{sent_at}}
```
