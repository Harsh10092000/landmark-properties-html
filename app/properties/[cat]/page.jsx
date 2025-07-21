import React from "react";
import pool from "@/app/libs/mysql";
import Page2 from "./page2";
const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT * FROM property_module where pro_listed = 1 ORDER BY pro_id DESC`;
    const q1 =
      "SELECT COUNT(*) as total from property_module where pro_listed = 1";
    const [rows] = await db.query(q);
    const [total] = await db.query(q1);

    return { row: rows, total: total };
  } catch (err) {
    return err;
  }
};

const page = async ({ params, searchParams }) => {
  const { cat } = await params;
  if (!cat) {
    return <div>Invalid Property ID</div>;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //const arrproId = cat.split("-");
  let arrproId = [];
  let location = "";
  let adType = "All Properties";
  let location_len = "";
  let catType = "";
 
  if (
    cat === "commercial-properties" ||
    cat === "land-properties" ||
    cat === "residential-properties"
  ) {
    arrproId = cat.split("-");
    catType = capitalizeFirstLetter(arrproId[0]);
  } else if (cat.startsWith("properties-for-sale-in")) {
    location_len = cat.substring("properties-for-sale-in-".length);

    adType = "Sale";
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-rent-in")) {
    adType = "Rent";
    location_len = cat.substring("properties-for-rent-in-".length);
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-sale")) {
    adType = "Sale";
  } else if (cat.startsWith("properties-for-rent")) {
    adType = "Rent";
  }

  const currentUser = "";

  let currentPage = (await searchParams["page"]) || 1;
  const res = await getData(currentPage);
  const data = res.row;

  const recordsPerPage = 12;
  return (
    <div className="container">
      <title>Landmark Plots - View All Properties</title>
      <meta
        name="description"
        content="Discover a diverse range of properties for sale and rent in Kurukshetra, including residential lands, independent houses, commercial buildings, and agricultural lands. Explore your dream property today!"
      />
      <meta name="author" content="Landmark Plots" />
      <link rel="canonical" href="https://landmarkplots.com/allproperties" />
      

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.pro_url}`}>
            {item.pro_url}
          </a>
        ))}
      </div>

      <Page2
        data={data}
        currentUser={currentUser}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        catType={catType}
        cat={cat}
        adType={adType}
        location={location}
      />
    </div>
  );
};

export default page;
