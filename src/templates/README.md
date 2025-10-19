# Email Templates

This directory contains HTML email templates used in the ATradezone™ Cloud application.

## Templates

1. **Reset Password Email** - `email/reset-password.html`
   - Used when users request to reset their password
   - Includes a reset link and user instructions

2. **Account Activation Email** - `email/activation.html`
   - Sent to new users after registration
   - Contains an activation link to verify their account

## Shared Styles

- **Stylesheet** - `email/styles.css`
  - Contains shared CSS styles used by all email templates
  - Ensures consistent branding and appearance across all emails
  - Uses the same color scheme and design elements as the main application

## Variables

The templates use placeholder variables that should be replaced with actual values when sending emails:

- `{{username}}` - The recipient's username or name
- `{{resetLink}}` - Password reset link (reset-password template only)
- `{{activationLink}}` - Account activation link (activation template only)
- `{{privacyPolicyLink}}` - Link to privacy policy
- `{{termsLink}}` - Link to terms of service

## Usage

To use these templates in your application:

1. Read the HTML template file
2. Replace the placeholder variables with actual values
3. Send the email using your preferred email service

Example (Node.js with a template engine):

```javascript
const template = fs.readFileSync('src/templates/email/reset-password.html', 'utf8');
const emailHtml = template
  .replace('{{username}}', user.name)
  .replace('{{resetLink}}', resetUrl)
  .replace('{{privacyPolicyLink}}', privacyPolicyUrl)
  .replace('{{termsLink}}', termsUrl);
```

## Design Consistency

The email templates follow the same design language as the main application, including:
- The gradient header with ATradezone™ Cloud branding
- Consistent color scheme (#01363C, #024a52, #c8e6c9, #85ed68)
- Similar card-based layout with rounded corners and shadows
- Responsive design that works on both desktop and mobile devices
- Dynamic copyright year that automatically updates to the current year
- Company logo on the left and favicon on the right in the header

## Image Hosting for Email Templates

**Important:** For images to display correctly in email clients, they must be accessible via absolute URLs, not relative paths.

The email templates currently use placeholder URLs:
- Logo: `https://yourdomain.com/images/atradezone-logo-big-size.png`
- Favicon: `https://yourdomain.com/images/web-favicon.png`

When deploying your application, you must replace `yourdomain.com` with your actual domain name.

For example, if your domain is `atradezone.ca`, update the URLs to:
- Logo: `https://atradezone.ca/images/atradezone-logo-big-size.png`
- Favicon: `https://atradezone.ca/images/web-favicon.png`

This is because email clients cannot access local file paths and require publicly accessible URLs to display images.
