import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ZAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ZAI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.z.ai/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'glm-4.5-airx',
        messages: messages,
        stream: true,
        max_tokens: 8192,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // If API key has insufficient balance, return demo mode
      if (response.status === 429 || errorData.error?.code === '1113') {
        return NextResponse.json({
          demo: true,
          message: 'API key has insufficient balance. Using demo mode with sample responses.',
          sampleHtml: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 0; text-align: center; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        h1 { font-size: 3rem; margin-bottom: 20px; font-weight: 700; }
        p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .btn { display: inline-block; background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; transition: transform 0.3s; }
        .btn:hover { transform: translateY(-2px); }
        .features { padding: 80px 0; background: #f8f9fa; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-top: 50px; }
        .feature { text-align: center; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .feature h3 { font-size: 1.5rem; margin-bottom: 15px; color: #667eea; }
        .footer { background: #2c3e50; color: white; text-align: center; padding: 40px 0; }
    </style>
</head>
<body>
    <section class="hero">
        <div class="container">
            <h1>Welcome to PolyVibe</h1>
            <p>Build amazing dApps with AI-powered development tools</p>
            <a href="#" class="btn">Get Started</a>
        </div>
    </section>
    
    <section class="features">
        <div class="container">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 20px;">Features</h2>
            <div class="grid">
                <div class="feature">
                    <h3>AI-Powered Coding</h3>
                    <p>Generate code with natural language prompts and intelligent suggestions</p>
                </div>
                <div class="feature">
                    <h3>Web3 Integration</h3>
                    <p>Built-in tools for Polygon blockchain development and smart contracts</p>
                </div>
                <div class="feature">
                    <h3>Real-time Preview</h3>
                    <p>See your changes instantly with live preview and hot reload</p>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 PolyVibe. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
        });
      }
      
      return NextResponse.json(
        { error: errorData.error?.message || 'GLM API request failed' },
        { status: response.status }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
            } catch {
              // Skip invalid JSON
            }
              }
            }
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('GLM API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

