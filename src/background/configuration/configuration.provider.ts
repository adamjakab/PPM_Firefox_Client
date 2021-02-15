import { Configuration } from '../../lib/model/configuration'

export class ConfigurationProvider {
  private readonly _config: Configuration

  public async getConfiguration () {
    return new Promise<Configuration>((resolve, reject) => {
      setTimeout(() => {
        resolve(this._config)
      }, 50)
    })
  }
}
