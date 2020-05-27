import { Logger, UseFilters,UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';

import { AnalysesService } from './analyses.service';
import { RepositoryToAnalyzeDto } from './dto/repository-to-analyze.dto';
import { WsExceptionFilter } from './filters/ws-exception.filter';

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe())
@WebSocketGateway()
export class AnalysesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly analysesService: AnalysesService) {}

  handleConnection(client: WebSocket): void {
    Logger.log(`Client connected ${(<any>client)._socket.remoteAddress}`);
  }
  handleDisconnect(client: WebSocket): void {
    Logger.log(`Client disconnected ${(<any>client)._socket.remoteAddress}`);
  }

  @SubscribeMessage('perform_analysis')
  async handlePerformAnalysis(
    @MessageBody() repositoryToAnalyzeDto: RepositoryToAnalyzeDto,
  ): Promise<WsResponse> {
    return this.analysesService.performAnalysis(repositoryToAnalyzeDto.clone_url);
  }
}
