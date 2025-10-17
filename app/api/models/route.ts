export async function GET() {
  // Mock list of available models
  const models = [
    {
      id: 'llama3',
      name: 'Llama 3 (Local)',
      provider: 'local',
      available: false,
      description: 'Run locally via Ollama or LM Studio',
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      available: false,
      description: 'OpenAI GPT-4 (requires API key)',
    },
    {
      id: 'claude-3',
      name: 'Claude 3',
      provider: 'anthropic',
      available: false,
      description: 'Anthropic Claude 3 (requires API key)',
    },
    {
      id: 'mock',
      name: 'Mock Model (Active)',
      provider: 'custom',
      available: true,
      description: 'Mock streaming response for development',
    },
  ];

  return Response.json({ models });
}

