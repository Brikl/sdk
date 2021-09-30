export const GET_PRODUCTS = `query products($first: Int!) {
  products(first: $first) {
    edges {
      cursor
      node {
        id
        title
        description
        media {
          source
          alt
        }
        slugs {
          url
        }
      }
    }    
  }
}`

export const GET_DETAILED_PRODUCT = `query GetProduct($id: ID!) {
    product(id: $id) {
        title
        description
        price {
          amount
          currencyCode
        }
        slugs {
            url
        }
        media {
            id
            type
            source
            alt
            isThumbnail
        }
        options {
            id
            type
            title
            values {
                id
                title
            }
        }
    }
}`