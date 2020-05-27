import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { RepositoryToAnalyzeDto } from './dto/repository-to-analyze.dto';
import { AnalysesService } from './analyses.service';

@WebSocketGateway()
@UsePipes(ValidationPipe)
export class AnalysesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly analysesService: AnalysesService) {}

  handleConnection(client: WebSocket): void {
    Logger.log(`Client connected ${client._socket.remoteAddress}`);
  }
  handleDisconnect(client: WebSocket): void {
    Logger.log(`Client disconnected ${client._socket.remoteAddress}`);
  }

  @SubscribeMessage('perform_analysis')
  async handlePerformAnalysis(
    _client: WebSocket,
    repositoryToAnalyze: RepositoryToAnalyzeDto,
  ): Promise<WsResponse> {
    return await this.analysesService.performAnalysis(repositoryToAnalyze.clone_url);
  }
}
