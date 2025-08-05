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

export const metadata = {
  title: "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today",
  description: "Discover your dream property with LandmarkPlots.com, a premier platform offering exclusive land and real estate opportunities. Explore a curated selection of prime plots, residential, and commercial properties tailored to your needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="3PcL6iH5Cja8l2D6155wrCas1jpJh7BM9PKFupsa0ZQ" />
    
    
        <link rel="preload" fetchpriority="high" as="image" href="/assets/img/hero/hero-banner.webp" type="image/webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;family=Nunito:wght@300;400;500;600;700&amp;display=swap"
          rel="stylesheet"
        />
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