import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { VoteButton } from "./VoteButton";

export async function Vote({ postId, votes }) {
  async function upvote() {
    "use server";
    const session = await auth();
    if(session) {
      console.log("Upvote", postId, "by user", session.user.id);
      try {
        await db.query(
          "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
          [session.user.id, postId, 1, "post"]
        );
      }
      catch (error) {
        console.log(error);
      }
      revalidatePath("/");
      revalidatePath(`/post/${postId}`);
    }
    else {
      redirect("/naughty");
    }
  }

  async function downvote() {
    "use server";
    const session = await auth();
    if(session) {
      console.log("Downvote", postId, "by user", session.user.id);
      try {
        await db.query(
          "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
          [session.user.id, postId, -1, "post"]
        );
      }
      catch (error) {
        console.log(error);
      }   
      revalidatePath("/");
      revalidatePath(`/post/${postId}`);
    }
    else {
      redirect("/naughty");
    }
  }

  return (
    <>
      {votes} votes
      <div className="flex space-x-3">
        <form action={upvote}>
          <VoteButton label="Upvote" />
        </form>
        <form action={downvote}>
          <VoteButton label="Downvote" />
        </form>
      </div>
    </>
  );
}
