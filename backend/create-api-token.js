const crypto = require('crypto');
const { Client } = require('pg');

async function createApiToken() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME || 'strapi',
    user: process.env.DATABASE_USERNAME || 'strapi',
    password: process.env.DATABASE_PASSWORD || 'strapi_dev_password_2024',
  });

  await client.connect();

  const tokenName = 'Frontend API Token';
  const tokenDescription = 'API token for frontend Nuxt SSG';
  const tokenType = 'read-only';
  const tokenValue = crypto.randomBytes(48).toString('base64');
  
  // Check if token already exists
  const existing = await client.query(
    'SELECT id FROM strapi_api_tokens WHERE name = $1',
    [tokenName]
  );

  if (existing.rows.length > 0) {
    console.log('Token already exists, retrieving...');
    const result = await client.query(
      'SELECT access_key FROM strapi_api_tokens WHERE name = $1',
      [tokenName]
    );
    console.log('TOKEN:', result.rows[0].access_key);
    await client.end();
    return;
  }

  // Insert new token
  const now = new Date().toISOString();
  const result = await client.query(
    `INSERT INTO strapi_api_tokens (name, description, type, access_key, created_at, updated_at, published_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, access_key`,
    [tokenName, tokenDescription, tokenType, tokenValue, now, now, now]
  );

  console.log('API Token created successfully!');
  console.log('TOKEN:', result.rows[0].access_key);

  await client.end();
}

createApiToken().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
