export interface PluginInstance {
  execute(): Promise<void> | void;
}
