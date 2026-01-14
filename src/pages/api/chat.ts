import type { APIRoute } from 'astro';
import { deepseek } from '@ai-sdk/deepseek';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: deepseek('deepseek-chat'),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};