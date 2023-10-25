import { list } from "@vercel/blob";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {

 const { blobs } = await list();

 // Convert the Date object to a string
 const serializedBlobs = blobs.map(blob => ({
  ...blob,
  uploadedAt: blob.uploadedAt.toISOString()
 }));

 return {
  props: {
   blobs: serializedBlobs
  }
 };
}


const WaitlistPage = ({ blobs }) => {

 const router = useRouter()
 const { id } = router.query
 console.log('props', blobs);
 console.log('id', id);

 const matchingBlob = blobs.find((blob) => blob.pathname.includes(id));

 console.log('matchingBlob', matchingBlob);

 return (
  <>
   {matchingBlob ? (
    <iframe src={matchingBlob.url} width="100%" height="100%"></iframe>
   ) : <h1>No blob found for this ID.</h1>}
  </>
 );
};

export default WaitlistPage;
