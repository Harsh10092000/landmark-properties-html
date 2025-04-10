import React from 'react'
import {
  DateFormatter,
  GetDay,
  GetMonth,
} from "@/components/helperFunctions/DateFun";
import {
  fetchGraphCategories,
  fetchGraphRecentPosts,
  fetchSinglePost,
} from "@/app/libs/graphapi";
import Link from "next/link";
import Image from "next/image";

const BlogListingSideBar = async () => {
    const catList = await fetchGraphCategories();
  const recentPosts = await fetchGraphRecentPosts();
  return (
    <div class="col-lg-4">
              <div class="listing__widget">
                <div class="blog__widget--step mb-30">
                  <h2 class="widget__step--title">Featured Items</h2>
                  <div class="widget__featured">
                    {recentPosts.nodes?.map((item, index) => (
                      <div key={index} class="widget__featured--items d-flex">
                        <div class="widget__featured--thumb">
                          <Link
                            className="widget__featured--thumb__link"
                            href={item.slug}
                          >
                            <img
                              src={item.featuredImage?.node.sourceUrl}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div class="widget__featured--content">
                          <span class="widget__featured--date">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5332 13H3.7832V10.75H1.5332V13ZM4.2832 13H6.7832V10.75H4.2832V13ZM1.5332 10.25H3.7832V7.75H1.5332V10.25ZM4.2832 10.25H6.7832V7.75H4.2832V10.25ZM1.5332 7.25H3.7832V5H1.5332V7.25ZM7.2832 13H9.7832V10.75H7.2832V13ZM4.2832 7.25H6.7832V5H4.2832V7.25ZM10.2832 13H12.5332V10.75H10.2832V13ZM7.2832 10.25H9.7832V7.75H7.2832V10.25ZM4.5332 3.5V1.25C4.5332 1.18229 4.50716 1.125 4.45508 1.07812C4.4082 1.02604 4.35091 0.999999 4.2832 0.999999H3.7832C3.71549 0.999999 3.6556 1.02604 3.60352 1.07812C3.55664 1.125 3.5332 1.18229 3.5332 1.25V3.5C3.5332 3.56771 3.55664 3.6276 3.60352 3.67969C3.6556 3.72656 3.71549 3.75 3.7832 3.75H4.2832C4.35091 3.75 4.4082 3.72656 4.45508 3.67969C4.50716 3.6276 4.5332 3.56771 4.5332 3.5ZM10.2832 10.25H12.5332V7.75H10.2832V10.25ZM7.2832 7.25H9.7832V5H7.2832V7.25ZM10.2832 7.25H12.5332V5H10.2832V7.25ZM10.5332 3.5V1.25C10.5332 1.18229 10.5072 1.125 10.4551 1.07812C10.4082 1.02604 10.3509 0.999999 10.2832 0.999999H9.7832C9.7155 0.999999 9.6556 1.02604 9.60352 1.07812C9.55664 1.125 9.5332 1.18229 9.5332 1.25V3.5C9.5332 3.56771 9.55664 3.6276 9.60352 3.67969C9.6556 3.72656 9.7155 3.75 9.7832 3.75H10.2832C10.3509 3.75 10.4082 3.72656 10.4551 3.67969C10.5072 3.6276 10.5332 3.56771 10.5332 3.5ZM13.5332 3V13C13.5332 13.2708 13.4342 13.5052 13.2363 13.7031C13.0384 13.901 12.804 14 12.5332 14H1.5332C1.26237 14 1.02799 13.901 0.830078 13.7031C0.632161 13.5052 0.533203 13.2708 0.533203 13V3C0.533203 2.72917 0.632161 2.49479 0.830078 2.29687C1.02799 2.09896 1.26237 2 1.5332 2H2.5332V1.25C2.5332 0.906249 2.6556 0.611978 2.90039 0.367187C3.14518 0.122395 3.43945 -9.53674e-07 3.7832 -9.53674e-07H4.2832C4.62695 -9.53674e-07 4.92122 0.122395 5.16602 0.367187C5.41081 0.611978 5.5332 0.906249 5.5332 1.25V2H8.5332V1.25C8.5332 0.906249 8.6556 0.611978 8.90039 0.367187C9.14518 0.122395 9.43945 -9.53674e-07 9.7832 -9.53674e-07H10.2832C10.627 -9.53674e-07 10.9212 0.122395 11.166 0.367187C11.4108 0.611978 11.5332 0.906249 11.5332 1.25V2H12.5332C12.804 2 13.0384 2.09896 13.2363 2.29687C13.4342 2.49479 13.5332 2.72917 13.5332 3Z"
                                fill="#FA4A4A"
                              />
                            </svg>
                            {DateFormatter({ date: item.date })}
                          </span>
                          <h3 class="widget__featured--title m-0">
                            <Link href={item.slug}>{item.title}</Link>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div class="blog__widget--step mb-30">
                  <h2 class="widget__step--title">Catagories</h2>
                  <ul class="widget__catagories--menu">
                    {/* <li class="widget__catagories--items">
                      <a
                        class="widget__catagories--link d-flex align-items-center justify-content-between"
                        href="#"
                      >
                        <span class="widget__catagories--menu__text">
                          Modern Villa
                        </span>
                        <span class="widget__catagories--menu__text">03</span>
                      </a>
                    </li> */}

                    {catList?.map((item, index) => (
                      <li key={index} class="widget__catagories--items">
                        
                        <Link class="widget__catagories--link d-flex align-items-center justify-content-between" href={`/blog/category/${item.node.slug}`}>
                        <span class="widget__catagories--menu__text">
                          {item.node.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              
              </div>
            </div>
  )
}

export default BlogListingSideBar
