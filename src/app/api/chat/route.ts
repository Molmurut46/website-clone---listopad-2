import { NextRequest, NextResponse } from 'next/server';
import { GigaChat } from 'gigachat-node';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const giga = new GigaChat({
      clientSecretKey: process.env.GIGACHAT_AUTH_KEY!,
      isIgnoreTSL: true,
      isPersonal: true,
      autoRefreshToken: true
    });

    await giga.createToken();

    const gigaMessages = [
      {
        role: 'system',
        content: 'Ты - профессиональный юрист, специализирующийся на российском праве. Давай точные, полезные советы, но всегда уточняй, что это не замена официальной консультации. Отвечай на русском языке.'
      },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    ];

    const response = await giga.completion({
      messages: gigaMessages,
      model: 'GigaChat',
      temperature: 0.7,
      maxTokens: 500,
    });

    const assistantMessage = response.choices[0]?.message?.content || 'Извините, не удалось получить ответ.';

    return NextResponse.json({ content: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal server error', stack: (error as Error).stack || 'No stack' }, { status: 500 });
  }
}