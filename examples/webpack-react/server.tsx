import Fastify from 'fastify';
import { Index as renderToString } from './src/ssrEntry';
const fastify = Fastify();

// Declare a route
fastify.get('/', async function handler(request, reply) {
  reply
    .code(200)
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(renderToString(undefined));
});

// Run the server!
(async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
