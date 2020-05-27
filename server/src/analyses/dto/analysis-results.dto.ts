import { WsResponse } from '@nestjs/websockets';

export class AnalysisResultsDto implements WsResponse {
  event: string;
  data: any;

  constructor(results: any[]) {
    this.event = 'results';
    this.data = results;
  }
}
