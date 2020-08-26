interface Configuration {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly mongoConnectionString: string;
  readonly pluginsPath: string;
  readonly port: number;
  readonly sessionSecret: string;
}
