export const projectsQuery = `
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    status,
    publishedAt,
    mainImage {
      asset -> {
        _id,
        url
      }
    },
    body,
    categories[] -> {
      title
    }
  }
`;

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    description,
    slug {
      _type,
      current
    },
    publishedAt,
    cover {
      asset -> {
        _id,
        url
      }
    },
    Type,
    categories[] -> {
      title
    },
    author -> {
      name
    },
    content
  }
`;