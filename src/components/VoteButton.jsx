"use client";

import { useFormStatus } from "react-dom";

export function VoteButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="border rounded border-zinc-600 px-3 py-2 hover:bg-pink-400 hover:text-black"
      disabled={pending}
    >
      {pending ? `${label}-ing` : label}
    </button>
  );
}
