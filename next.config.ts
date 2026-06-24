import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/client",
    "@libsql/client",
    "libsql",
    "@libsql/isomorphic-ws",
    "@libsql/isomorphic-fetch",
    "better-sqlite3",
  ],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean)),
        ({ request }: { request: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (
            request.startsWith("@libsql/") ||
            request.startsWith("libsql") ||
            request === "better-sqlite3"
          ) {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ];
    }
    return config;
  },
};

export default nextConfig;
