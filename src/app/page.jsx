import { PostList } from "../components/PostList";
import Link from "next/link";

export default async function Home() {
  return <>
  <Link className="max-w-screen-lg mx-auto p-4 mb-4 text-3xl underline hover:text-pink-500" 
        href={"/tiptap-test"}>TipTap Test</Link>
  <PostList />
  </>;
}
