import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com','res.cloudinary.com'],
  },
};

export default nextConfig;
