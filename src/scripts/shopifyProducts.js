import { postToShopify } from "./shopify";
import store from '../store'
const query = {
    "query": "fragment VariantFragment on ProductVariant  { id,title,price,priceV2 { amount,currencyCode },weight,available: availableForSale,sku,compareAtPrice,compareAtPriceV2 { amount,currencyCode },image { id,src: originalSrc,altText,width,height },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment CollectionFragment on Collection  { id,handle,description,descriptionHtml,updatedAt,title,image { id,src: originalSrc,altText } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src,altText,width,height } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($first:Int!,$query:String,$sortKey:CollectionSortKeys,$reverse:Boolean,$productsFirst:Int!)  { collections (first: $first query: $query sortKey: $sortKey reverse: $reverse) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...CollectionFragment,products (first: $productsFirst) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...ProductFragment } } } } } } }",
    "variables": {
        "first": 20,
        "productsFirst": 20
    }
}
export const getProducts = async () => {
    try {
      // @ts-ignore
       const shopifyResponse = await postToShopify( query );
    //     query: `{
    //        products(sortKey: TITLE, first: 100) {
    //         edges {
    //           node {
    //             id
    //             handle
    //             description
    //             title
    //             totalInventory
    //             productType
    //             variants(first: 5) {
    //               edges {
    //                 node {
    //                   id
    //                   title
    //                   quantityAvailable
    //                   price
    //                 }
    //               }
    //             }
    //             priceRange {
    //               maxVariantPrice {
    //                 amount
    //                 currencyCode
    //               }
    //               minVariantPrice {
    //                 amount
    //                 currencyCode
    //               }
    //             }
    //             images(first: 1) {
    //               edges {
    //                 node {
    //                   src
    //                   altText
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //   }
    //     `,
    //   });
      return shopifyResponse;
    } catch (error) {
      console.log(error);
    }
  };
  // Get product details
  export const getProductDetails = async (handle) => {
    try {
      const shopifyResponse = await postToShopify({
        query: ` 
          query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
              id
              handle
              description
              title
              totalInventory
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    quantityAvailable
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
        `,
        variables: {
          handle: handle,
        },
      });
  
      productDetails.set(shopifyResponse.productByHandle);
      return shopifyResponse.productByHandle;
    } catch (error) {
      console.log(error);
    }
  };