import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('sp_acc')?.value;
  const accessTokenExpires = request.cookies.get('sp_exp')?.value;
  const refreshToken = request.cookies.get('sp_ref')?.value;

  if (accessToken && accessTokenExpires && refreshToken && Number(accessTokenExpires) < Date.now()) {
    // Refresh token call
    try {
      const response = await axios.post('http://localhost:3000/api/refreshToken', null, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `sp_refresh_token=${refreshToken}`
        }
      });
      const { accessToken: newAccessToken, accessTokenExpires: newAccessTokenExpires, refreshToken: newRefreshToken } = response.data;
      const newResponse = NextResponse.next();
      newResponse.cookies.set('sp_acc', newAccessToken);
      newResponse.cookies.set('sp_exp', newAccessTokenExpires);
      newResponse.cookies.set('sp_ref', newRefreshToken);
      return newResponse;
    } catch (error) {
      console.error('Error refreshing access token', error);
      return NextResponse.error();
    }
  } else if (accessToken && accessTokenExpires && refreshToken) {
    // Pass through
    const response = NextResponse.next();
    response.cookies.set('sp_acc', accessToken);
    response.cookies.set('sp_exp', accessTokenExpires);
    response.cookies.set('sp_ref', refreshToken);
    return response;
  } else {
    // Send to landing page
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  matcher: ['/api/jira/', '/dashboard'],
}
