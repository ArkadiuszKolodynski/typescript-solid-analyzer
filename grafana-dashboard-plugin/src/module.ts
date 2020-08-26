import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder.addTextInput({
    path: 'url',
    name: 'TSOLID URL',
    description: 'URL to TSOLID',
    defaultValue: 'http://localhost:4321',
  });
});
