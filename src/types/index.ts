export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  image?: File;
  relatedToMessageId?: string; // To track which user message an assistant response is for
}

export interface ApiResponse {
  response: string;
}
