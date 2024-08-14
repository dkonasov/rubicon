import fastifyFactory from "fastify";
import fastifyStatic from "@fastify/static";
import { resolve, normalize, parse } from "path";
import { readdir, stat } from "fs/promises";
import { Stats } from "fs";
import { lookup } from "mime-types";
import { createReadStream } from "fs";

const fastify = fastifyFactory({ logger: true });

fastify.register(fastifyStatic, {
  root: resolve(process.cwd(), "./dist/client"),
});

const KNOWN_TEXT_FILES = new Set([".gitignore"]);

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

fastify.get("/api/initial-dir", () => {
  return normalize(`${process.env.RUBICON_INITIAL_DIR || process.env.HOME}/`);
});

fastify.get("/api/files/file", async (request, reply) => {
  const path = request.query["path"] as string;
  const parsedPath = parse(path);
  let mimeType = lookup(parsedPath.ext) || "application/octet-stream";

  if (KNOWN_TEXT_FILES.has(parsedPath.name)) {
    mimeType = "text/plain";
  }

  reply.header("Content-Type", mimeType);
  const stats = await stat(path);
  reply.header("Content-Length", stats.size);

  const fileStream = createReadStream(path);
  return reply.send(fileStream);
});

fastify.listen({ port: 8000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;

  console.log(`Server listening at ${address}`);
});
