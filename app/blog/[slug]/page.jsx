import BreadcrumbSection from "@/components/common/BreadcrumbSection";
import React from "react";
import {
  DateFormatter
} from "@/components/helperFunctions/DateFun";
import {
  fetchSinglePost
} from "@/app/libs/graphapi";
import "./markdownstyling.css";
import Link from "next/link";
import BlogListingSideBar from "@/components/blog/BlogListingSideBar";
import { getBusinessImageUrl } from "@/app/config/site";

const BUSINESS_IMAGE = getBusinessImageUrl();

export async function generateMetadata({ params }) {
  try {
    // Fetch the post data using the slug from params
    const res = await fetchSinglePost(params.slug);

    // If post not found, return default metadata
    if (!res) {
      return {
        title: "Post not found",
        description: "The requested blog post could not be found.",
      };
    }

    // Function to generate JSON-LD for product
    function addProductJsonLd(post) {
      if (!post) return { __html: "{}" };
      
      return {
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: post.title || "Untitled Post",
          image: [
            "https://example.com/photos/1x1/photo.jpg",
            "https://example.com/photos/4x3/photo.jpg",
            "https://example.com/photos/16x9/photo.jpg",
          ],
          description:
            "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
          sku: "0446310786",
          mpn: "925872",
          brand: {
            "@type": "Brand",
            name: "ACME",
          },
          review: {
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Fred Benson",
            },
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.4",
            reviewCount: "89",
          },
          offers: {
            "@type": "Offer",
            url: `https://box-and-move.vercel.app/blog/${post.slug || ""}`, // Use a full URL
            priceCurrency: "USD",
            price: "119.99",
            priceValidUntil: "2020-11-20",
            itemCondition: "https://schema.org/UsedCondition",
            availability: "https://schema.org/InStock",
          },
        }),
      };
    }

    // Return metadata for the page
      return {
        title: res.title || "Blog Post",
        description: res.excerpt || "Default description for the page.", // Fallback description if excerpt is not available
        openGraph: {
          title: res.title || "Blog Post",
          description: res.excerpt || "Description for the Open Graph",
          images: [
            res.featuredImage?.node?.sourceUrl || BUSINESS_IMAGE,
          ], // Full URL to image
        },
      jsonLd: {
        __html: addProductJsonLd(res).__html,
      },
    };
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error generating blog metadata:", error);
    }
    return {
      title: "Blog Post",
      description: "Default description for the page.",
    };
  }
}

const getData = async (params) => {
  try {
    const res = await fetchSinglePost(params.slug);

    //const post = await getPostBySlug(params?.slug);
    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV !== 'production') {
      console.error("Error fetching blog post:", error);
    }
    return null;
  }
};

const page = async ({ params }) => {
  const post = await getData(params);
  
  // Handle case when post is not found
  if (!post) {
    return (
      <main class="main__content_wrapper">
        <section class="blog__details--section section--padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="blog__details--wrapper">
                  <div class="blog__details--content">
                    <h3 class="blog__content--title">Post Not Found</h3>
                    <p>The requested blog post could not be found.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  
  return (
    <main class="main__content_wrapper">
      <BreadcrumbSection val1={post.title || "Blog Post"} />

      <section class="blog__details--section section--padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="blog__details--wrapper">
                {post.featuredImage?.node?.sourceUrl && (
                  <div class="blog__details--thumbnail mb-30">
                    <img
                      class="blog__details--thumbnail--media"
                      src={post.featuredImage.node.sourceUrl || BUSINESS_IMAGE}
                      alt={post.title || "Blog post image"}
                    />
                  </div>
                )}
                <div class="blog__details--content">
                  <div class="blog__details--content__top mb-40">
                    <ul class="blog__meta d-flex">
                      {post.author?.node?.name && (
                        <li class="blog__meta--list d-flex align-items-center">
                          <span class="blog__meta--icon">
                            <svg
                              width="14"
                              height="16"
                              viewBox="0 0 14 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.5 9.5H5.5C2.4375 9.5 0 11.9688 0 15C0 15.5625 0.4375 16 1 16H13C13.5312 16 14 15.5625 14 15C14 11.9688 11.5312 9.5 8.5 9.5ZM1.5 14.5C1.75 12.5312 3.4375 11 5.5 11H8.5C10.5312 11 12.2188 12.5312 12.4688 14.5H1.5ZM7 8C9.1875 8 11 6.21875 11 4C11 1.8125 9.1875 0 7 0C4.78125 0 3 1.8125 3 4C3 6.21875 4.78125 8 7 8ZM7 1.5C8.375 1.5 9.5 2.625 9.5 4C9.5 5.40625 8.375 6.5 7 6.5C5.59375 6.5 4.5 5.40625 4.5 4C4.5 2.625 5.59375 1.5 7 1.5Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <span class="blog__meta--text">{post.author.node.name}</span>
                        </li>
                      )}
                      {post.categories?.edges && post.categories.edges.length > 0 && (
                        <li class="blog__meta--list d-flex align-items-center">
                          <span class="blog__meta--icon">
                            <svg
                              width="17"
                              height="14"
                              viewBox="0 0 17 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.37483 2.17857C8.58316 1.86905 7.73197 1.71428 6.82126 1.71428C5.91054 1.71428 5.05935 1.86905 4.26768 2.17857C3.47602 2.48809 2.84507 2.90774 2.37483 3.4375C1.91054 3.96726 1.6784 4.53571 1.6784 5.14286C1.6784 5.63095 1.83614 6.10119 2.15161 6.55357C2.46709 7.00595 2.91054 7.39881 3.48197 7.73214L4.34804 8.23214L4.03554 8.98214C4.23792 8.8631 4.42245 8.74702 4.58911 8.63393L4.98197 8.35714L5.45518 8.44643C5.91947 8.52976 6.37483 8.57143 6.82126 8.57143C7.73197 8.57143 8.58316 8.41667 9.37483 8.10714C10.1665 7.79762 10.7945 7.37798 11.2588 6.84821C11.729 6.31845 11.9641 5.75 11.9641 5.14286C11.9641 4.53571 11.729 3.96726 11.2588 3.4375C10.7945 2.90774 10.1665 2.48809 9.37483 2.17857ZM3.66054 1.1875C4.63078 0.776785 5.68435 0.571428 6.82126 0.571428C7.95816 0.571428 9.00876 0.776785 9.97304 1.1875C10.9433 1.59226 11.7082 2.14583 12.2677 2.84821C12.8272 3.55059 13.107 4.31548 13.107 5.14286C13.107 5.97024 12.8272 6.73512 12.2677 7.4375C11.7082 8.13988 10.9433 8.69643 9.97304 9.10714C9.00876 9.5119 7.95816 9.71429 6.82126 9.71429C6.30935 9.71429 5.78554 9.66667 5.24983 9.57143C4.51173 10.0952 3.68435 10.4762 2.76768 10.7143C2.5534 10.7679 2.29745 10.8155 1.99983 10.8571H1.97304C1.90757 10.8571 1.84507 10.8333 1.78554 10.7857C1.73197 10.7381 1.69923 10.6756 1.68733 10.5982C1.68137 10.5804 1.6784 10.5625 1.6784 10.5446C1.6784 10.5208 1.6784 10.5 1.6784 10.4821C1.68435 10.4643 1.6903 10.4464 1.69626 10.4286C1.70816 10.4107 1.71709 10.3958 1.72304 10.3839C1.72899 10.372 1.73792 10.3571 1.74983 10.3393C1.76768 10.3155 1.77959 10.3006 1.78554 10.2946C1.79745 10.2827 1.81233 10.2679 1.83018 10.25C1.84804 10.2262 1.85995 10.2113 1.8659 10.2054C1.89566 10.1696 1.96411 10.0952 2.07126 9.98214C2.1784 9.86905 2.25578 9.78274 2.3034 9.72321C2.35102 9.65774 2.41649 9.57143 2.49983 9.46429C2.58911 9.35119 2.66352 9.23512 2.72304 9.11607C2.78852 8.99702 2.85102 8.86607 2.91054 8.72321C2.17245 8.29464 1.59209 7.76786 1.16947 7.14286C0.746851 6.51786 0.535542 5.85119 0.535542 5.14286C0.535542 4.31548 0.815303 3.55059 1.37483 2.84821C1.93435 2.14583 2.69626 1.59226 3.66054 1.1875ZM14.1605 11.0089C14.2201 11.1518 14.2796 11.2827 14.3391 11.4018C14.4046 11.5208 14.479 11.6369 14.5623 11.75C14.6516 11.8571 14.7201 11.9405 14.7677 12C14.8153 12.0655 14.8927 12.1548 14.9998 12.2679C15.107 12.381 15.1754 12.4554 15.2052 12.4911C15.2111 12.497 15.223 12.5089 15.2409 12.5268C15.2588 12.5506 15.2707 12.5655 15.2766 12.5714C15.2885 12.5833 15.3004 12.5982 15.3123 12.6161C15.3302 12.6399 15.3421 12.6577 15.348 12.6696C15.354 12.6815 15.3599 12.6964 15.3659 12.7143C15.3778 12.7321 15.3838 12.75 15.3838 12.7679C15.3897 12.7857 15.3927 12.8036 15.3927 12.8214C15.3927 12.8452 15.3897 12.8661 15.3838 12.8839C15.3659 12.9673 15.3272 13.0327 15.2677 13.0804C15.2082 13.128 15.1427 13.1488 15.0713 13.1429C14.7736 13.1012 14.5177 13.0536 14.3034 13C13.3867 12.7619 12.5594 12.381 11.8213 11.8571C11.2855 11.9524 10.7617 12 10.2498 12C8.63673 12 7.23197 11.6071 6.03554 10.8214C6.38078 10.8452 6.64268 10.8571 6.82126 10.8571C7.77959 10.8571 8.69923 10.7232 9.58018 10.4554C10.4611 10.1875 11.2469 9.80357 11.9373 9.30357C12.6814 8.75595 13.2528 8.125 13.6516 7.41071C14.0504 6.69643 14.2498 5.94048 14.2498 5.14286C14.2498 4.68452 14.1814 4.23214 14.0445 3.78571C14.8123 4.20833 15.4195 4.73809 15.8659 5.375C16.3123 6.0119 16.5355 6.69643 16.5355 7.42857C16.5355 8.14286 16.3242 8.8125 15.9016 9.4375C15.479 10.0565 14.8986 10.5804 14.1605 11.0089Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </span>
                          {post.categories.edges.map(({ node }) => (
                            node && (
                              <Link
                                key={node.slug}
                                href={`/blog/category/${node.slug}`}
                                rel="bookmark"
                              >
                                <span className="blog__meta--text">
                                  {node.name}
                                </span>
                              </Link>
                            )
                          ))}
                        </li>
                      )}
                      {post.date && (
                        <li class="blog__meta--list d-flex align-items-center">
                          <span class="blog__meta--icon">
                            <svg
                              width="14"
                              height="15"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.17773 0.96875C10.9238 0.96875 13.959 4.00391 13.959 7.75C13.959 11.4961 10.9238 14.5312 7.17773 14.5312C3.43164 14.5312 0.396484 11.4961 0.396484 7.75C0.396484 4.00391 3.43164 0.96875 7.17773 0.96875ZM7.17773 13.2188C10.1855 13.2188 12.6465 10.7852 12.6465 7.75C12.6465 4.74219 10.1855 2.28125 7.17773 2.28125C4.14258 2.28125 1.70898 4.74219 1.70898 7.75C1.70898 10.7852 4.14258 13.2188 7.17773 13.2188ZM8.8457 10.375L6.52148 8.67969C6.43945 8.625 6.41211 8.51562 6.41211 8.43359V3.92188C6.41211 3.75781 6.54883 3.59375 6.74023 3.59375H7.61523C7.7793 3.59375 7.94336 3.75781 7.94336 3.92188V7.80469L9.74805 9.14453C9.91211 9.25391 9.93945 9.44531 9.83008 9.60938L9.31055 10.293C9.20117 10.457 9.00977 10.4844 8.8457 10.375Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <span class="blog__meta--text">{DateFormatter({ date: post.date })}</span>
                        </li>
                      )}
                    </ul>
                    {post.title && <h3 class="blog__content--title ">{post.title}</h3>}
                   
                  </div>

                  {post.content && (
                    <div className="pbmit-entry-content">
                      <div
                        className="markdown py-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <BlogListingSideBar />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
