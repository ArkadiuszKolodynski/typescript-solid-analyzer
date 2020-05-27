import { Logger, UsePipes, ValidationPipe, UseFilters } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { WebSocket } from 'ws';
import { RepositoryToAnalyzeDto } from './dto/repository-to-analyze.dto';
import { AnalysesService } from './analyses.service';
import { WsExceptionFilter } from './filters/ws-exception.filter';

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe())
@WebSocketGateway()
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
    @MessageBody() repositoryToAnalyzeDto: RepositoryToAnalyzeDto,
  ): Promise<WsResponse> {
    return this.analysesService.performAnalysis(repositoryToAnalyzeDto.clone_url);
  }
}
