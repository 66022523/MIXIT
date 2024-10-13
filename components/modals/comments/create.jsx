"use client";
import { useState } from "react";

export default function CommentModal() {
  const [content, setContent] = useState("");

//   const fetchGIFs = () => {
//     const apiKey = process.env.NEXT_PUBLIC_TENOR_API_KEY;
//     const clientKey = process.env.NEXT_PUBLIC_TENOR_CLIENT_KEY;
//     const limit = 8;
//     const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`;

//     fetch(searchUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         setGifs(data.results || []);
//       })
//       .catch((error) => console.error("Error fetching GIFs:", error));
//   };

  const sendComment = () => {
    console.log("Comment submitted:", content);
  };

  return (
    <form className="space-x-4">
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your comment"
        rows="3"
        className="textarea textarea-bordered w-full"
      />

      <button
        className="btn btn-primary btn-block"
        disabled={!content || !tags.length}
        onClick={sendComment}
      >
        Submit Comment
      </button>
    </form>
  );
}
