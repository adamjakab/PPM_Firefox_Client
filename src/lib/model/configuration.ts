
const defaultConfiguration = {
  logger: {
    do_console_logging: true,
    do_console_logging2: true
  }
}
export class Configuration {
  private readonly _configuration: any

  constructor () {
    this._configuration = defaultConfiguration
  }

  public getAll () {
    return this._configuration
  }
}
