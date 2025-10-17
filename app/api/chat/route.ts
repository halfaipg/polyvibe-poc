import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a mock streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        // Mock AI response
        const mockResponse = `This is a mock AI response to your message: "${message}". 

In the next phase, this will be connected to Google ADK agents that can:
- Generate code
- Refactor existing code
- Provide Polygon dApp guidance
- Use local or cloud AI models

The response will stream in real-time for better UX.`;

        // Simulate streaming by sending characters with delay
        for (const char of mockResponse) {
          await new Promise((resolve) => setTimeout(resolve, 20));
          
          const chunk = {
            type: 'token',
            content: char,
          };
          
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
          );
        }

        // Send done signal
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
        );
        
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


