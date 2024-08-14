export function getFilenameFromPath(path: string) {
  return path.split("/").pop();
}
