/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        webURL: "https://api.propertyease.in/",
        //webURL: "http://localhost:8010/",
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.propertyease.in',
            port: '',
            // pathname: '/account123/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
