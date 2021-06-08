export enum RunEnvironment {
    development = 'DEVELOPMENT',
    staging = 'STAGING',
    production = 'PRODUCTION',
}

export interface Config {
    processTitle: string;
    port: number;
    runEnvironment: RunEnvironment;
    internal: boolean;
    logging: LoggingConfig;
    auth: AuthConfig;
}

export interface LoggingConfig {
    prettyPrint: boolean;
    level: string;
}
export interface AuthConfig {
    jwtSecret: string;
    jwtTokenExpiration: number;
    saltRounds: number;
    maxLoginAttempts: number;
}
