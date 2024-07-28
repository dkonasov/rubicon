import fastifyFactory from "fastify";
import fastifyStatic from "@fastify/static";
import { resolve } from "path";

const fastify = fastifyFactory({ logger: true });

fastify.register(fastifyStatic, {
  root: resolve(process.cwd(), "./dist/client"),
});

fastify.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening at ${address}`);
});
