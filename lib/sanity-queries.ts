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

export const servicesQuery = `
  *[_type == "services"] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    keywords,
    body,
    relatedProjects,
    featured,
    publishedAt
  }
`;

export const serviceBySlugQuery = `
  *[_type == "services" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    keywords,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          ...,
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    relatedProjects,
    featured,
    publishedAt
  }
`;