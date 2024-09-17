declare module 'react-tiny-link' {
  import { FC } from 'react'

  interface ReactTinyLinkProps {
    cardSize?: 'small' | 'large';
    showGraphic?: boolean;
    maxLine?: number;
    minLine?: number;
    url: string;
    proxyUrl?: string;
    requestHeaders?: Record<string, string>;
    className?: string;
    onError?: (error: any) => void;
    onSuccess?: (response: any) => void;
  }

  export const ReactTinyLink: FC<ReactTinyLinkProps>
}
