// API Fetcher utility

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export async function fetcher<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL || ''}${endpoint}`;
  
  const response = await fetch(url, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
