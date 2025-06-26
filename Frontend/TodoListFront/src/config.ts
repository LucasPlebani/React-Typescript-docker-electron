const hostname = window.location.hostname;

export const API_URL =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "0.0.0.0"
    ? "http://localhost:3000"
    : "http://host.docker.internal:3000";