import { createClient } from '@supabase/supabase-js';

const url = 'https://msqajouplvokmrmxctbs.supabase.co';

const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjcyNTk2MiwiZXhwIjoxOTUyMzAxOTYyfQ.5ucvvS1Hqw2oozYxCHqmfnIqNNyGNegm81tUjbJm7BM';

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'my-app-name' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

export const supabase = createClient(url, key, options);
