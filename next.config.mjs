/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        webURL: "https://api.propertyease.in",
        whatsappNumber: "919996716787"
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
