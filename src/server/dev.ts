import { type ChildProcessWithoutNullStreams, spawn } from "child_process";
import { watch as watchDir } from "chokidar";

let runningAppProcess: ChildProcessWithoutNullStreams;

function startServer() {
  runningAppProcess = spawn("node", ["dist/server/src/server/index.js"]);

  runningAppProcess.stdout.pipe(process.stdout);
  runningAppProcess.stderr.pipe(process.stderr);
}

startServer();

const watcher = watchDir("src/server", {
  ignoreInitial: true,
});

watcher.on("all", () => {
  console.log("Server files changed, restarting server...");
  runningAppProcess.kill("SIGINT");
  const buildProcess = spawn("npm", ["run", "build:server"]);
  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);
  buildProcess.on("exit", () => {
    startServer();
  });
});
