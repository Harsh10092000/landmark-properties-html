import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";
import "@/app/styles/custom.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Providers from "./progressBarprovider";
import SocialMediaFooter from "@/components/common/SocialMediaFooter";
import AppSessionProvider from "./AppSessionProvider";
import StructuredData from "@/components/common/StructuredData";

export const metadata = {
  title: "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today",
  description: "Discover your dream property with LandmarkPlots.com, a premier platform offering exclusive land and real estate opportunities. Explore a curated selection of prime plots, residential, and commercial properties tailored to your needs.",
  keywords: "LandmarkPlots, Landmark Properties, real estate Kurukshetra, property broker Haryana, land for sale Kurukshetra, residential properties Haryana, commercial properties Kurukshetra, construction company Haryana, 5-star reviews, trusted real estate, SCO 32 Sector 10 Kurukshetra",
  authors: [{ name: "Landmark Properties" }],
  creator: "Landmark Properties - Real Estate Broker & Builders",
  publisher: "Landmark Properties",
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "https://landmarkplots.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://landmarkplots.com/",
    title: "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today",
    description: "Discover your dream property with LandmarkPlots.com, a premier platform offering exclusive land and real estate opportunities. Explore a curated selection of prime plots, residential, and commercial properties tailored to your needs.",
    siteName: "LandmarkPlots",
    images: [
      {
        url: "https://landmarkplots.com/images/property-banner-img.jpg",
        width: 1200,
        height: 630,
        alt: "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today",
    description: "Discover your dream property with LandmarkPlots.com, a premier platform offering exclusive land and real estate opportunities.",
    images: ["https://landmarkplots.com/images/property-banner-img.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en_in">
      <head>
        <StructuredData />
        <meta name="google-site-verification" content="3PcL6iH5Cja8l2D6155wrCas1jpJh7BM9PKFupsa0ZQ" />
        
        {/* Cross-brand SEO meta tags */}
        <meta name="author" content="Landmark Properties - Real Estate Broker & Builders" />
        <meta name="copyright" content="Landmark Properties" />
        <meta name="application-name" content="LandmarkPlots" />
        <meta name="apple-mobile-web-app-title" content="LandmarkPlots" />
        
        {/* Customer Reviews and Ratings Meta Tags */}
        <meta name="rating" content="4.8" />
        <meta name="reviewCount" content="25" />
        <meta name="aggregateRating" content="4.8 out of 5 stars from 25 reviews" />
        
        {/* Business information meta tags */}
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Kurukshetra, Haryana" />
        <meta name="geo.position" content="29.9695;76.8783" />
        <meta name="ICBM" content="29.9695, 76.8783" />
        
        {/* Local business schema for Google Business */}
        <meta property="business:contact_data:street_address" content="1st Floor, Cabin 2, SCO 32, beside New Bus Stand, Sector 10" />
        <meta property="business:contact_data:locality" content="Kurukshetra" />
        <meta property="business:contact_data:region" content="Haryana" />
        <meta property="business:contact_data:postal_code" content="136118" />
        <meta property="business:contact_data:country_name" content="India" />
        <meta property="business:contact_data:phone_number" content="+91-999-671-6787" />
        
        {/* Business location and landmark meta tags */}
        <meta name="business:location" content="SCO 32, Sector 10, Kurukshetra" />
        <meta name="business:landmark" content="beside New Bus Stand" />
        <meta name="business:floor" content="1st Floor, Cabin 2" />
        
        {/* Social media and business image meta tags */}
        <meta property="og:image" content="https://landmarkplots.com/uploads/default.jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Landmark Properties - Real Estate Broker & Builders" />
        
        {/* Instagram and social media links */}
        <meta property="og:see_also" content="https://www.instagram.com/reel/DMUs1fbBPIq/" />
        <link rel="me" href="https://www.instagram.com/reel/DMUs1fbBPIq/" />
        
        <link rel="preload" fetchpriority="high" as="image" href="/assets/img/hero/hero-banner.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;family=Nunito:wght@300;400;500;600;700&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <AppSessionProvider>
        <body>
          <Providers>
            <Header />
            {children}
            <SocialMediaFooter />
            <Footer />
          </Providers>
        </body>
      </AppSessionProvider>
    </html>
  );
}