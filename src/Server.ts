import type {FastifyInstance} from "fastify";
import Fastify from "fastify";
import cors from '@fastify/cors';
import swaggerUI from '@fastify/swagger-ui';


/** Fastify server instance **/
const fastify: FastifyInstance = Fastify({ logger: true })

/**
 * Builds and configures the Fastify server instance.
 * @returns {Promise<FastifyInstance>} The configured Fastify server instance.
 */
async function buildServer(): Promise<FastifyInstance> {
    await fastify.register(cors, { origin: '*' });

    await fastify.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'list',
            deepLinking: false
        }
    });

    return fastify;
}

/**
 * Starts the Fastify server.
 * @see buildServer
 */
const start: () => Promise<void> = async (): Promise<void> => {
    const app: FastifyInstance = await buildServer();

    try {
        await app.listen({ port: 3000 })
        app.log.info(`Server running at http://localhost:3000`)
        app.log.info(`Swagger UI available at http://localhost:3000/docs`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}


void start();