// Model Configuration Types
export interface ModelConfig {
  provider: 'local' | 'openai' | 'anthropic' | 'custom';
  endpoint: string;
  model: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
}

// Message Types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  metadata?: {
    model?: string;
    tokens?: number;
    error?: string;
  };
}

// Chat API Types
export interface ChatRequest {
  sessionId?: string;
  message: string;
  context?: {
    files?: string[];
    modelOverride?: string;
  };
}

export interface ChatStreamChunk {
  type: 'token' | 'done' | 'error';
  content?: string;
  error?: string;
}

// Agent Types
export interface AgentSession {
  id: string;
  createdAt: number;
  modelConfig: ModelConfig;
  messageCount: number;
}

export interface CreateAgentRequest {
  modelConfig: ModelConfig;
}

export interface CreateAgentResponse {
  sessionId: string;
}

// Model Provider Types
export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  available: boolean;
  description?: string;
}

export interface ModelsResponse {
  models: ModelInfo[];
}

// Settings Types
export interface AppSettings {
  model: ModelConfig;
  ui: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'sm' | 'md' | 'lg';
  };
  wallet?: {
    address?: string;
    network?: string;
  };
}


