export interface LoginCredentials {
  username: string;
  password: string;
}

export async function loginHR(credentials: LoginCredentials): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return response.ok;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

export function isValidCredentials(username: string, password: string): boolean {
  return username === 'HRSRCE' && password === '@SRCEhr1314';
}
