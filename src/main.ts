import { FastifyApp } from '#app/index';
import config from '#lib/config';
import { initPrism } from '#lib/prisma';

export class Main {
    static async init(): Promise<void> {
        process.title = config().processTitle;

        await initPrism();

        const fastifyApp = new FastifyApp();
        fastifyApp.listen();
    }
}
