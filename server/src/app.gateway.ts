import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { dir } from 'tmp-promise';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as rimraf from 'rimraf';
import * as path from 'path';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('analysis')
  async analysis(client: WebSocket, data: any): Promise<void> {
    console.log(data);
    const o = await dir();
    execSync(`git clone ${data.clone_url} .`, {
      stdio: [0, 1, 2],
      cwd: o.path,
    });
    const file = fs.readFileSync(o.path + path.sep + 'package.json');
    console.log(file.toString());
    // console.log(repo);
    console.log(o);
    rimraf.sync(o.path);
    client.close();
  }
}
