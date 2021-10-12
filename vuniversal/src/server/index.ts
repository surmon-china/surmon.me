import { IncomingMessage } from 'http';

export interface RendererResult {
  status: number;
  html: string;
  title?: string;
  keywords?: string;
  description?: string;
  head?: string;
  footer?: string;
}

export type UniversalServerRenderer = (request: IncomingMessage) => Promise<RendererResult>
export interface UniversalServerOptions {
  render: UniversalServerRenderer
}
export const universalServer = (options: UniversalServerOptions) => {
  return
}
