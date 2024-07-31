import fastifyFactory from "fastify";
import fastifyStatic from "@fastify/static";
import { resolve } from "path";
import { readdir, stat } from "fs/promises";
import { Stats } from "fs";

const fastify = fastifyFactory({ logger: true });

fastify.register(fastifyStatic, {
  root: resolve(process.cwd(), "./dist/client"),
});

fastify.get("/api/folder/contents", async function handler(request, reply) {
  const path = request.query["path"] as string;
  const entries = await readdir(path);
  const stats: (Stats | null)[] = await Promise.all(
    entries.map((entry) =>
      stat(`${path}${entry}`).catch((err) => {
        console.log(`Error reading ${entry}: ${err}`);
        return null;
      })
    )
  );

  return stats.map((stat, index) => ({
    isDirectory: stat?.isDirectory() ?? false,
    name: entries[index],
  }));
});

fastify.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening at ${address}`);
});
