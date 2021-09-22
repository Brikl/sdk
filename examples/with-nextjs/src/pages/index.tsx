import type { FunctionComponent } from 'react'

import Link from 'next/link'
import type { GetServerSideProps } from 'next'

import { gql, StorefrontContext } from '@brikl/storefront-js'

interface Props {
  products: unknown[]
}

const Page: FunctionComponent<Props> = ({ products = [] }) => {
  console.log(products.map(({ node }) => node))

  return (
    <main
      className="grid gap-4 w-full max-w-[1280px] mx-auto p-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      }}
    >
      {products.map(({ node: { id, title, description, media } }) => (
        <Link key={id} href={`/product/${id}`}>
          <article className="flex flex-col cursor-pointer">
            {media[0] && (
              <>
                <img
                  className="mb-2"
                  src={media[0].source}
                  alt={media[0].alt}
                />
                <h3 className="text-3xl font-semibold my-2">{title}</h3>
                <h4 className="text-base text-gray-500">{description}</h4>
              </>
            )}
          </article>
        </Link>
      ))}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  StorefrontContext.initialize({
    shopId: 'vermarc',
  })

  const { data, errors } = await gql(`
    query {
      products(salesChannelId: "ff660213-ab56-4b7a-b2f1-3e0f74c2b28c", first: 5) {
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
    }
  `)

  if (errors)
    return {
      props: {
        products: [],
      },
    }

  const {
    products: { edges: products },
  } = data

  return {
    props: {
      products,
    },
  }
}

export default Page
