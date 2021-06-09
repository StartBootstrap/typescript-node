import { Config, RunEnvironment } from '#lib/config/models';

export const defaultConfig: Config = {
    processTitle: <string>process.env.PROCESS_TITLE,
    port: <number>Number(<string>process.env.PORT) || 8200,
    runEnvironment: <RunEnvironment>(process.env.RUN_ENVIRONMENT || RunEnvironment.development),
    internal: <boolean>(process.env.INTERNAL === 'true' || false),
    logging: {
        prettyPrint: <boolean>(process.env.LOGGING_PRETTY_PRINT === 'true' || false),
        level: process.env.LOGGING_LEVEL || 'info',
    },
    auth: {
        jwtSecret: <string>process.env.JWT_SECRET,
        jwtTokenExpiration: <number>Number(<string>process.env.JWT_TOKEN_EXPIRATION) || 300,
        saltRounds: <number>Number(<string>process.env.BCRYPT_SALT_ROUNDS) || 12,
        maxLoginAttempts: <number>Number(<string>process.env.MAX_LOGIN_ATTEMPTS) || 10,
    },
};

export const mockConfig: jest.Mock<Partial<Config>, []> = jest.fn(() => defaultConfig);

export default mockConfig;
