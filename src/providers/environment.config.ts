const PRODUCTION_API = 'http://138.68.5.36/api/v1/';

/**
 * Considera ambiente de desenvolvimento sempre que estiver com livereload ativo, como:
 *  - ionic run android -l
 *  - ionic serve
 *
 * @static {boolean} IS_PRODUCTION
 * @static {string}  API_URL
 * @export
 * @class EnvironmentConfig
 */
export class EnvironmentConfig {
  public static readonly IS_PRODUCTION: boolean = window.location.href.indexOf(':81') === -1;
  public static readonly API_URL: string = EnvironmentConfig.IS_PRODUCTION ? PRODUCTION_API : `${window.location.href.split(':81')[0]}:8020/api/v1/`;
}
