import * as WS from 'ws';

declare module 'ws' {
  interface WebSocket extends WS {
    _socket: any;
  }
}
