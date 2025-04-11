import BlogCard from "@/components/blog/BlogCard";
import BreadcrumbSection from "@/components/common/BreadcrumbSection";
import BlogListingSideBar from "@/components/blog/BlogListingSideBar";
import PaginationComponent from "@/components/common/PaginationComponent";
import { fetchPostByCat } from "@/app/libs/graphapi";
import Providers from "@/app/progressBarprovider";

const getData = async (params) => {
  try {
    const res = await fetchPostByCat(params.slug);
    return res || []; // Return empty array if res is falsy
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return empty array on error
  }
};

const page = async ({ params , searchParams }) => {
  //const posts = await getData();
  const posts = await getData(params);

  // Ensure currentPage is a number, default to 1 if invalid
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const recordsPerPage = 12;

  // Pagination calculations
  const totalPosts = posts.length;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // Ensure valid slicing
  const records = totalPosts > 0 ? posts.slice(firstIndex, lastIndex) : [];
  const nPages = totalPosts > 0 ? Math.ceil(totalPosts / recordsPerPage) : 1;

  const url = `/blog/category/${params.slug}`;

  //console.log("nPages , currentPage : ", nPages, currentPage);

  return (
    <Providers>
    <main className="main__content_wrapper">
      <BreadcrumbSection val1="Blog" />

      <section className="blog__page--section section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog__page--wrapper">
                {records.length > 0 ? (
                  records.map((item, index) => (
                    <BlogCard key={item.id || index} item={item} />
                  ))
                ) : (
                  <p>No blog posts available.</p>
                )}
              </div>
            </div>
            <BlogListingSideBar />
          </div>
          <PaginationComponent
            Pages={nPages} // Fixed prop name to lowercase
            currentPage={currentPage}
            url={url}
          />
        </div>
      </section>
    </main>
    </Providers>
  );
};

export default page;