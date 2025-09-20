import pool from "@/app/libs/mysql";

export default async function sitemap() {
  const baseUrl = 'https://landmarkplots.com';
  
  try {
    const db = await pool;
    
    // Get total counts for each property type
    const [saleCount] = await db.query("SELECT COUNT(*) as total FROM property_module WHERE pro_listed = 1 AND pro_ad_type = 'Sale'");
    const [rentCount] = await db.query("SELECT COUNT(*) as total FROM property_module WHERE pro_listed = 1 AND pro_ad_type = 'Rent'");
    
    // Get all active property URLs
    const [activeProperties] = await db.query("SELECT pro_url FROM property_module WHERE pro_listed = 1 ORDER BY pro_id DESC");
    
    const recordsPerPage = 12;
    const salePages = Math.ceil(saleCount[0].total / recordsPerPage);
    const rentPages = Math.ceil(rentCount[0].total / recordsPerPage);
    
    // Generate static pages
    const staticPages = [
      // Main pages
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/properties-for-sale`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/properties-for-rent`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/allproperties`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      
      // Property category pages
      {
        url: `${baseUrl}/residential-properties`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/commercial-properties`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/land-properties`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      
      // Kurukshetra specific pages
      {
        url: `${baseUrl}/kurukshetra-real-estate`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/kurukshetra-maps`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/kurukshetra-pin-code`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kurukshetra-university-pin-code`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/hsvp-private-property-sale-purpose-portal`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      
      // Blog pages
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      
      // User pages
      // {
      //   url: `${baseUrl}/login`,
      //   lastModified: new Date(),
      //   changeFrequency: 'monthly',
      //   priority: 0.5,
      // },
      {
        url: `${baseUrl}/add-property`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/quick-listing`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      
      // Information pages
      {
        url: `${baseUrl}/aboutus`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/contactus`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/disclaimer`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      
      // Newsletter pages
      // {
      //   url: `${baseUrl}/subscribe`,
      //   lastModified: new Date(),
      //   changeFrequency: 'monthly',
      //   priority: 0.4,
      // },
      // {
      //   url: `${baseUrl}/unsubscribe`,
      //   lastModified: new Date(),
      //   changeFrequency: 'monthly',
      //   priority: 0.3,
      // },
    ];
    
    // Generate paginated URLs for properties-for-sale
    const salePagesUrls = [];
    for (let i = 1; i <= salePages; i++) {
      salePagesUrls.push({
        url: `${baseUrl}/properties-for-sale?page=${i}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
    
    // Generate paginated URLs for properties-for-rent
    const rentPagesUrls = [];
    for (let i = 1; i <= rentPages; i++) {
      rentPagesUrls.push({
        url: `${baseUrl}/properties-for-rent?page=${i}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
    
    // Generate individual property URLs
    const propertyUrls = activeProperties.map(property => ({
      url: `${baseUrl}/${property.pro_url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
    
    // Generate kurukshetra maps inner pages (if they exist)
    // const kurukshetraMapsUrls = [];
    // // Add specific map pages if they exist in your database or file system
    // const mapPages = [
    //   'sector-1', 'sector-2', 'sector-3', 'sector-4', 'sector-5',
    //   'sector-6', 'sector-7', 'sector-8', 'sector-9', 'sector-10',
    //   'sector-11', 'sector-12', 'sector-13', 'sector-14', 'sector-15',
    //   'sector-16', 'sector-17', 'sector-18', 'sector-19', 'sector-20',
    //   'sector-21', 'sector-22', 'sector-23', 'sector-24', 'sector-25',
    //   'sector-26', 'sector-27', 'sector-28', 'sector-29', 'sector-30'
    // ];
    
    // mapPages.forEach(sector => {
    //   kurukshetraMapsUrls.push({
    //     url: `${baseUrl}/kurukshetra-maps/${sector}`,
    //     lastModified: new Date(),
    //     changeFrequency: 'monthly',
    //     priority: 0.6,
    //   });
   // });
    
    // Generate blog category pages
    // const blogCategoryUrls = [
    //   'real-estate-tips',
    //   'property-investment',
    //   'kurukshetra-properties',
    //   'property-news',
    //   'home-buying-guide',
    //   'rental-properties'
    // ].map(category => ({
    //   url: `${baseUrl}/blog/category/${category}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.6,
    // }));
    
     return [...staticPages, ...salePagesUrls, ...rentPagesUrls, ...propertyUrls];
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}

