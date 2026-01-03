// Basit fetch yardımcıları: JSON body, hata mesajı ve Authorization header yönetimi

export interface JsonRequestInit extends RequestInit {
  headers?: Record<string, string>;
  body?: any;
}

export const withAuthHeader = (token?: string, headers: Record<string, string> = {}) => {
  if (!token) return headers;
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

export const jsonFetch = async <T>(url: string, init: JsonRequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }

  return data as T;
};


