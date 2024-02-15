"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function saveComment({ postId, parentCommentId }, formData) {
  const session = await auth();

  if(session) {
    await db.query(
      "INSERT INTO comments (user_id, post_id, parent_comment_id, body) VALUES ($1, $2, $3, $4)",
      [session.user.id, postId, parentCommentId, formData.get("comment")]
    );

    revalidatePath(`/post/${postId}`);
    return { success: true };
  }
  else {
    redirect("/naughty");
  }
  
}
