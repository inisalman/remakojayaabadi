// Reset admin password via Strapi admin API
// Usage: node reset-admin.js <new-password>
const newPassword = process.argv[2];
if (!newPassword || newPassword.length < 8) {
  console.error('Usage: node reset-admin.js <new-password (min 8 chars)>');
  process.exit(1);
}

const STRAPI_URL = 'http://localhost:1337';

// Strapi v5 forgot-password flow: request a reset token (via admin API)
// The token is returned in dev mode in the response; in prod it's emailed.
async function main() {
  try {
    const resetReq = await fetch(`${STRAPI_URL}/admin/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@remakojayaabadi.com' }),
    });
    const resetData = await resetReq.json();
    console.log('forgot-password status:', resetReq.status);
    console.log('response:', JSON.stringify(resetData).slice(0, 500));
  } catch (e) {
    console.error('Error:', e.message);
  }
}
main();
