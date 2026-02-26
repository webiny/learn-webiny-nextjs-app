import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "frame-ancestors",
              "http://localhost:3001",
              ...whitelistedDomains(),
            ].join(" "),
            // Example: "frame-ancestors http://localhost:3001 https://d3fak6u4cx01ke.cloudfront.net"
          },
        ],
      },
    ];
  },
};

export default nextConfig;

function whitelistedDomains(): string[] {
  const adminHost = process.env.NEXT_PUBLIC_WEBSITE_BUILDER_ADMIN_HOST ?? "";
  return adminHost.split(",").map((host) => host.trim());
}
1;
