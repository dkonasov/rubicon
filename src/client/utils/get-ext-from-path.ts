export function getExtFromPath(path: string) {
  const filename = path.split("/").pop();
  if (filename.lastIndexOf(".") === 0) {
    return "";
  }

  return path.split(".").pop();
}
