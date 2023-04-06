import { cookies } from 'next/headers';

export function getAccessToken(req: any) {
  const cookieStore: any = cookies();
  console.log(cookieStore);

  const accessToken = cookieStore.get('access-token');

  if (!accessToken) {
    // handle it better
    return;
  }

  return accessToken;
}

export async function getSessionId() {
  return await fetch('http://localhost:3000/api/auth/sessionId', {
    method: 'POST',
  }).then(res => {
    return res.json();
  }).then(res => {
    return res.sessionId;
  }).catch(err => {
    console.error(err);
  });
}