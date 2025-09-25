import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

async function getAccessToken() {
  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) {
    throw new Error('GigaChat auth key not configured');
  }

  const rqUID = crypto.randomUUID();
  const tokenResponse = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
    method: 'POST',
    agent: httpsAgent,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'RqUID': rqUID,
      'Authorization': `Basic ${authKey}`,
    },
    body: new URLSearchParams({ scope: 'GIGACHAT_API_PERS' }).toString(),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Token fetch failed: ${tokenResponse.status} ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const chatUrl = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';
    const chatResponse = await fetch(chatUrl, {
      method: 'POST',
      agent: httpsAgent,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'GigaChat',
        messages: [
          {
            role: 'system',
            content: 'Ты - профессиональный юрист, специализирующийся на российском праве. Давай точные, полезные советы, но всегда уточняй, что это не замена официальной консультации. Отвечай на русском языке.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      throw new Error(`GigaChat API error: ${chatResponse.status} ${errorText}`);
    }

    const chatData = await chatResponse.json();
    const assistantMessage = chatData.choices[0]?.message?.content || 'Извините, не удалось получить ответ.';

    return NextResponse.json({ content: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}