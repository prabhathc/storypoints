import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dotenv from 'dotenv';

interface TokenPackage {
    accessToken: string;
    accessTokenExpires: string;
    refreshToken: string;
}

async function refreshAccessToken(refreshToken: string): Promise<TokenPackage> {
    const clientId = process.env.ATLASSIAN_CLIENT_ID;
    const clientSecret = process.env.ATLASSIAN_CLIENT_SECRET;
    const tokenEndpoint = 'https://auth.atlassian.com/oauth/token';

    const requestBody = {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
    };

    try {
        const response = await axios.post(tokenEndpoint, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });
        const accessToken = response.data.access_token;
        const accessTokenExpires = Date.now() + response.data.expires_in;
        const refreshToken = response.data.refresh_token;
        return {
            accessToken, accessTokenExpires, refreshToken
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to refresh access token.');
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const refreshToken = req.cookies['sp_refresh_token'];
    if (!refreshToken) {
        return res.status(401).send('Refresh token is missing or invalid.');
    }

    try {
        const { accessToken, accessTokenExpires, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);
        res.setHeader('Set-Cookie', [
            `sp_acc=${accessToken}; Path=/; HttpOnly; Secure`,
            `sp_ref=${newRefreshToken}; Path=/; HttpOnly; Secure`,
            `sp_exp=${Date.now() + (Number(accessTokenExpires) * 1000)}; path=/; HttpOnly; Secure`
        ]);
        res.status(200).json({ message: 'Access token refreshed successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Failed to refresh access token.');
    }
}
