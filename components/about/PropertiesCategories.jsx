import Link from "next/link";
import React from "react";

const PropertiesCategories = () => {
  // Array of category data
  const categories = [
    {
      id: 1,
      title: "Land Properties",
      image: "assets/img/other/categories1.png",
      count: 13,
      description:
        "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.",
      link: "/properties/land-properties",
      delay: 100,
    },
    {
      id: 2,
      title: "Residential Properties",
      image: "assets/img/other/categories2.png",
      count: 24,
      description:
        "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.",
      link: "/properties/residential-properties",
      delay: 150,
    },
    {
      id: 3,
      title: "Commercial Properties",
      image: "assets/img/other/categories3.png",
      count: 43,
      description:
        "With over 1 million+ homes for sale available on the website, Trulia can match you with a house you will want to call home.",
      link: "properties/commercial-properties",
      delay: 200,
    },
  ];

  return (
    <section className="categories__section categories__bg section--padding">
      <div className="container">
        <div
          className="section__heading text-center mb-50"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
        >
          <h3 className="section__heading--subtitle h5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_15_6)">
                <path
                  d="M9.00021 4.72925L2.5806 10.0215C2.5806 10.029 2.57872 10.04 2.57497 10.055C2.57129 10.0698 2.56934 10.0806 2.56934 10.0883V15.4473C2.56934 15.6408 2.64008 15.8085 2.78152 15.9497C2.92292 16.091 3.09037 16.1621 3.2839 16.1621H7.571V11.8747H10.4295V16.1622H14.7165C14.91 16.1622 15.0777 16.0913 15.2189 15.9497C15.3603 15.8086 15.4313 15.6408 15.4313 15.4473V10.0883C15.4313 10.0586 15.4272 10.0361 15.4201 10.0215L9.00021 4.72925Z"
                  fill="#16A34A"
                />
                <path
                  d="M17.8758 8.81572L15.4309 6.78374V2.2285C15.4309 2.12437 15.3974 2.03872 15.3302 1.9717C15.2636 1.90475 15.178 1.87128 15.0736 1.87128H12.93C12.8258 1.87128 12.7401 1.90475 12.6731 1.9717C12.6062 2.03872 12.5727 2.1244 12.5727 2.2285V4.4056L9.8486 2.12792C9.61069 1.93439 9.3278 1.83765 9.00026 1.83765C8.67275 1.83765 8.3899 1.93439 8.15175 2.12792L0.124063 8.81572C0.0496462 8.87516 0.00885955 8.95517 0.00127316 9.05567C-0.00627412 9.15609 0.0197308 9.2438 0.079366 9.31818L0.771565 10.1444C0.831201 10.2113 0.909254 10.2523 1.00604 10.2673C1.09539 10.2748 1.18475 10.2486 1.27411 10.1891L9.00002 3.74687L16.726 10.1891C16.7857 10.241 16.8637 10.2669 16.9605 10.2669H16.994C17.0907 10.2522 17.1686 10.211 17.2285 10.1442L17 W9208 9.31814C17.9803 9.2436 18.0064 9.15605 17.9987 9.05551C17.991 8.95528 17.9501 8.87527 17.8758 8.81572Z"
                  fill="#16A34A"
                />
              </g>
              <defs>
                <clipPath>
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Real estate agency
          </h3>
          <h2 className="section__heading--title">Properties Categories</h2>
        </div>
        <div className="categories__inner row mb--n30">
          {categories.map((category) => (
            <div
              key={category.id}
              className="col-lg-4 col-md-6 col-sm-6 mb-30"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={category.delay}
            >
              <div className="categories__box">
                <div className="categories__thumbnail text-center">
                  <img src={category.image} alt="categories-img" />
                </div>
                <span className="categories__badge">{category.count}</span>
                <div className="categories__content text-center">
                  <h3 className="categories__title">
                    <Link href={category.link}>{category.title}</Link>
                  </h3>
                  <p className="categories__desc">{category.description}</p>
                  <Link className="categories__link" href={category.link}>
                    See Properties{" "}
                    <svg
                      width="33"
                      height="19"
                      viewBox="0 0 33 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.5123 9.14893C31.5123 13.9435 27.7735 17.7979 23.2005 17.7979C18.6275 17.7979 14.8887 13.9435 14.8887 9.14893C14.8887 4.3544 18.6275 0.5 23.2005 0.5C27.7735 0.5 31.5123 4.3544 31.5123 9.14893Z"
                        stroke="#BDC2C6"
                      />
                      <path
                        d="M26.9592 9.53033C27.2521 9.23744 27.2521 8.76256 26.9592 8.46967L22.1862 3.6967C21.8933 3.40381 21.4184 3.40381 21.1255 3.6967C20.8326 3.98959 20.8326 4.46447 21.1255 4.75736L25.3682 9L21.1255 13.2426C20.8326 13.5355 20.8326 14.0104 21.1255 14.3033C21.4184 14.5962 21.8933 14.5962 22.1862 14.3033L26.9592 9.53033ZM0.245117 9.75L26.4288 9.75L26.4288 8.25L0.245117 8.25L0.245117 9.75Z"
                        fill="#16A34A"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesCategories;