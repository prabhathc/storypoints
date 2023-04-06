import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dotenv from 'dotenv';

interface TokenPackage {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
}

async function exchangeCodeForAccessToken(code: string): Promise<TokenPackage> {
    const clientID = process.env.ATLASSIAN_CLIENT_ID;
    const clientSecret = process.env.ATLASSIAN_CLIENT_SECRET;
    const redirectURI = 'http://localhost:3000/api/auth/getToken';
    const tokenEndpoint = 'https://auth.atlassian.com/oauth/token';

    const requestBody = {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectURI,
    };

    try {
        console.log("printing tokenEndpoint and requestBody", tokenEndpoint, requestBody);
        const response = await axios.post(tokenEndpoint, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('printing response', response);
        const accessToken = response.data.access_token;
        const accessTokenExpires = Number(response.data.expires_in);
        const refreshToken = response.data.refresh_token;
        return {
            accessToken, accessTokenExpires, refreshToken
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to exchange authorization code for access token.');
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { code } = req.query;
    if (typeof code !== 'string') {
        return res.status(400).send('Authorization code is missing or invalid.');
    }
    
    console.log('printing code', code);

    try {
        const { accessToken, accessTokenExpires, refreshToken } = await exchangeCodeForAccessToken(code);
        // Need to move the refresh token to DB
        // Also need to encrypt this data
        res.setHeader('Set-Cookie', [
            `sp_acc=${accessToken}; Path=/; HttpOnly; Secure`,
            `sp_ref=${refreshToken}; Path=/; HttpOnly; Secure`,
            `sp_exp=${Date.now() + (accessTokenExpires * 1000)}; Path=/; HttpOnly; Secure`
        ]);
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Failed to exchange authorization code for access token.');
    }
}
