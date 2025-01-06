import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Esto ignora todos los errores de ESLint durante el build
  },
};

export default nextConfig;
