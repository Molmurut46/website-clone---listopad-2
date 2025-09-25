import { NextRequest, NextResponse } from 'next/server';

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  try {
    const tokenResponse = await fetch('https://ngw.devices.sberbank.ru:9443/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.GIGACHAT_CLIENT_ID!,
        client_secret: process.env.GIGACHAT_CLIENT_SECRET!,
        scope: 'GIGACHAT_API_PERS',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Token fetch failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    cachedToken = tokenData.access_token;
    tokenExpiry = now + (tokenData.expires_in * 1000) - 60000; // Refresh 1 min early
    return cachedToken;
  } catch (error) {
    console.error('Error fetching GigaChat token:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversation } = await request.json();

    const token = await getAccessToken();

    const systemPrompt = `Ты - ИИ юридический консультант для адвоката Иванова А.И., специализирующийся на: семейные споры, жилищные споры, земельные споры, оформление наследства, защита прав потребителей, административные дела, уголовные дела, УДО.

Если вопрос выходит за рамки этих тем, ответь: "Затрудняюсь ответить на этот вопрос, так как он выходит за рамки специализации (семейные, жилищные, земельные споры, наследство, защита прав потребителей, административные/уголовные дела, УДО). Лучше позвоните по телефону +7 (910) 312-88-00 для личной консультации."

Если точного ответа нет, скажи: "Точного ответа у меня нет. Рекомендую перезвонить адвокату для личного обсуждения: +7 (910) 312-88-00."

Всегда заканчивай каждый ответ: "*Отвечает интеллектуальный помощник. Для официальной консультации обратитесь к адвокату Иванову А.И. лично.*"

Предоставляй только общую информацию. Всегда советуй личную консультацию для конкретных случаев. Отвечай на русском языке.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation.map((msg: { text: string; isUser: boolean }) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ];

    const chatResponse = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'GigaChat-2-Pro',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!chatResponse.ok) {
      throw new Error(`Chat API failed: ${chatResponse.statusText}`);
    }

    const data = await chatResponse.json();
    const aiReply = data.choices[0]?.message?.content || 'Извините, произошла ошибка.';

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json(
      { error: 'Извините, произошла ошибка при обращении к AI. Попробуйте позже или позвоните +7 (910) 312-88-00.' },
      { status: 500 }
    );
  }
}