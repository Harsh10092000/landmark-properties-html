import { GraphQLClient } from 'graphql-request';

// Initialize the GraphQL client
// const client = new GraphQLClient('https://examhelp.online/blog/graphql'); 
//const client = new GraphQLClient('https://t20cricketworldcup.info/graphql');
const client = new GraphQLClient('https://writool.com/news/graphql');

export async function fetchGraphPosts() {
  const query = `
    query AllPosts {
      posts(first: 200) {
        edges {
          node {
            id
            title
            excerpt
            content
            date
            author {
              node {
                id
                name            
              }
            }
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await client.request(query);
  return data.posts.edges;
}



export async function fetchGraphCategories() {
  const query = `
query NewQuery {
  categories {
    edges {
      node {
        categoryId
        id
        slug
        name
      }
    }
  }
}
`
const data = await client.request(query);
console.log(data.categories.edges)
  return data.categories.edges;
}


export async function fetchGraphRecentPosts() {
  const query = `

  query NewQuery {
    posts(first: 5) {
      nodes {
        date
        title
        slug
        featuredImage {
          node {
            slug
            srcSet
            sourceUrl
          }
        }
      }
    }
  }
`
const data = await client.request(query);
console.log(data.posts)
  return data.posts;
}







export async function fetchSinglePost(slug) {
  const query = `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
          }
        }
        id
        categories {
          edges {
            node {
              databaseId
              id
              name
              slug
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        databaseId
        title
        slug
        isSticky
        desiredSlug
      }
    }
  `;

  const variables = { slug };

  // Log variables to make sure they are correct
  //console.log("variables: ", variables);

  try {
    // Make the GraphQL request with the correct query and variables
    const data = await client.request(query, variables);
    //console.log("data: ", data);
    return data.post; // Corrected from data.postBy to data.post
  } catch (error) {
    //console.error("GraphQL request error: ", error);
    throw error;
  }
}



export async function fetchPostByCat(slug) {
  const query = `
   query PostsByCategory($slug: String!) {
    posts(first: 200, where: { categoryName: $slug }) {
      edges {
        node {
          id
          title
          excerpt
          date
          author {
            node {
              id
              name
            }
          }
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
  `;

  const variables = { slug };

  // Log variables to make sure they are correct
  //console.log("variables: ", variables);

  try {
    // Make the GraphQL request with the correct query and variables
    const data = await client.request(query, variables);
    //console.log("data: ", data);
    return data.posts.edges; // Corrected from data.postBy to data.post
  } catch (error) {
    //console.error("GraphQL request error: ", error);
    throw error;
  }
}

// export async function getPostBySlug(slug) {
//     const data = await fetchAPI(
//       `query GetPost($id: ID = "") {
//       post(id: $id, idType: SLUG) {
//         content
//         featuredImage {
//           node {
//             sourceUrl
//           }
//         }
//         slug
//         title
//       }
//     }`,
//       {
//         variables: {
//           id: slug,
//         },
//       }
//     );
  
//     return data?.post;
//   }