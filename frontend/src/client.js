import { SanityClient, createClient } from "@sanity/client";
import  createImageUrlBuilder  from "@sanity/image-url";
console.log(process.env.REACT_APP_SANITY_PROJECT_ID)
// export const client=createClient({
//     projectId:"6fzow3xg",
//     dataset:'production',
//     apiVersion:'2021-11-16',
//     useCdn:true,
// token:"skQyL2Ij8c8DBkNM2PPpYKYwmyhlPV3gfXYOoApGVWSasMJElAoqrXla1VC9cl1kF8hJvDljzEx0mxvbfDij77WS6yzX8EqSfU0vbClAnBjDOSG2dDSKTv3OMSckEIyN0DAdY6f7iOWRZo185tX67NHRWCCnbVBsaKtGANDd2gMXzqNTcMcr"


// });
export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false,
    // perspective: 'previewDrafts', // set to `false` to bypass the edge cache
    apiVersion: '2023-10-23', // use current date (YYYY-MM-DD) to target the latest API version
    visibility:"sync",
    token: process.env.REACT_APP_SANITY_TOKEN// Only if you want to update content with the client
  })
const builder=createImageUrlBuilder(client);
export const urlFor=(source)=>builder.image(source);
