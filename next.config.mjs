/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        //webURL: "https://api.propertyease.in",
        whatsappNumber: "919996716787",
        secondNumber: "919050048884",
        contactEmail: "propertieslandmark07@gmail.com",
        webURL: "http://localhost:3000/",
        queryOnWhatsapp: "https://wa.me/919996716787?text=https://landmarkplots.com/",
        shareOnWhatsapp: "https://api.whatsapp.com/send?text=https://landmarkplots.com/",

        default_image: "default.jpg",

        googleMapsApiKey: "AIzaSyDLzo_eOh509ONfCjn1XQp0ZM2pacPdnWc"
      },
      images: {
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'api.propertyease.in',
        //     port: '',
        //     // pathname: '/account123/**',
        //     search: '',
        //   },
        // ],
        remotePatterns: [
          {
            protocol: "https",
            hostname: 'api.propertyease.in',
            pathname: "/propertyImages/watermark/**",
          },
        ],
      },

      sassOptions: {
        quietDeps: true,
      },
      
};

export default nextConfig;
