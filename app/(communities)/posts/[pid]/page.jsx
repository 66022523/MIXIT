"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  FireIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import Link from "next/link";

export default function PostDetail({ params: { pid } }) {
  const supabase = createClient();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("All Comments");

  const hotTopics = [
    { id: "new-game", name: "NEWGAME", posts: 0, members: 0 },
    { id: "open-world", name: "OPENWORLD", posts: 0, members: 0 },
    { id: "mmo-rpg", name: "MMORPG", posts: 0, members: 0 },
  ];

  useEffect(() => {
    if (pid && supabase) {
      const fetchPost = async () => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*, writer:users!posts_writer_id_fkey(*)')
            .eq('id', pid)
            .single();

          if (error) {
            console.error('Error fetching post:', error);
          } else {
            setPost(data);
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        }
      };

      const fetchComments = async () => {
        try {
          const { data, error } = await supabase
            .from('comments')
            .select('*, writer:users!comments_writer_id_fkey(*)')
            .eq('post_id', pid);

          if (error) {
            console.error('Error fetching comments:', error);
          } else {
            setComments(data);
          }
        } catch (err) {
          console.error('Unexpected error:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
      fetchComments();
    }
  }, [pid, supabase]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  return (
    <div className="container mx-auto grid grid-cols-12 gap-12 p-4 lg:p-12">
      <div className="col-span-8">
        <div className="card bg-base-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="rounded-full w-16 h-16 bg-neutral text-neutral-content">
                  {post.writer.avatar_url ? (
                    <Image
                      alt={post.writer.nickname}
                      src={post.writer.avatar_url}
                      width={64}
                      height={64}
                    />
                  ) : (
                    <span className="text-lg font-bold">{post.writer.nickname?.charAt(0)}</span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-text">
                  {post.writer.nickname}
                </h4>
                <p className="text-sm text-text">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="btn btn-primary">Follow</button>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-circle btn-primary"
                >
                  <EllipsisHorizontalIcon className="w-6 h-6" />
                </button>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-2 w-52 bg-base-200 p-2 shadow-lg rounded-box"
                >
                  <li>
                    <a>
                      <FlagIcon className="w-5 h-5" />
                      Report this post
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="card-title text-3xl mb-4 text-text">{post.title}</h2>
          <p className="text-lg mb-6 text-text">{post.content}</p>

          {post.images && post.images.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              {post.images.map((image, index) => (
                <Image
                  key={index}
                  src={image.source}
                  alt={image.alternate}
                  width={640}
                  height={360}
                  className="rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex items-center space-x-6 text-text">
            <div className="flex items-center text-sm">
              <EyeIcon className="w-5 h-5 mr-2" />
              {post.views?.length || 0}
            </div>
            <div className="flex items-center text-sm">
              <HeartIcon className="w-5 h-5 mr-2" />
              {post.likes?.length || 0}
            </div>
            <div className="flex items-center text-sm">
              <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-2" />
              {comments?.length || 0}
            </div>
            <div className="flex items-center text-sm">
              <ShareIcon className="w-5 h-5 mr-2" />
              {post.shares?.length || 0}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex space-x-4 border-b pb-2 mb-4 overflow-x-auto whitespace-nowrap">
              {["All Comments", "Most Views", "Most Likes", "Most Comments", "Most Shares", "Newest", "Oldest"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => handleSortChange(option)}
                    className={`btn btn-ghost ${selectedSort === option ? "text-primary" : "text-text"}`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>

            {/* แสดงคอมเมนต์ */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="card bg-base-100 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="rounded-full w-12 h-12 bg-neutral text-neutral-content">
                            {comment.writer.avatar_url ? (
                              <Image
                                alt={comment.writer.nickname}
                                src={comment.writer.avatar_url}
                                width={48}
                                height={48}
                              />
                            ) : (
                              <span className="text-lg font-bold">{comment.writer.nickname?.charAt(0)}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-text">{comment.writer.nickname}</h4>
                          <p className="text-sm text-text">{new Date(comment.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm">Follow</button>
                    </div>
                    <p className="text-text mb-4">{comment.content}</p>
                    <div className="flex items-center space-x-6 text-text">
                      <div className="flex items-center text-sm">
                        <EyeIcon className="w-5 h-5 mr-2" />
                        {comment.views || 0}
                      </div>
                      <div className="flex items-center text-sm">
                        <HeartIcon className="w-5 h-5 mr-2" />
                        {comment.likes || 0}
                      </div>
                      <div className="flex items-center text-sm">
                        <ChatBubbleBottomCenterIcon className="w-5 h-5 mr-2" />
                        {comment.replies || 0}
                      </div>
                      <div className="flex items-center text-sm">
                        <ShareIcon className="w-5 h-5 mr-2" />
                        {comment.shares || 0}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text">No comments yet...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className="card bg-base-100 p-4">
          <h2 className="flex items-center text-xl font-bold">
            <FireIcon className="mr-2 h-6 w-6 text-red-500" />
            Hot Topics
          </h2>
          <ul>
            {hotTopics.map((topic, index) => (
              <li key={index} className="my-2">
                <Link
                  href={`/topics/${topic.id}`}
                  className="flex items-center text-primary"
                >
                  #{topic.name}
                </Link>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  - {topic.posts} posts • {topic.members} members
                </span>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary mt-4">View More</button>
        </div>

        <div className="mt-8 text-gray-400">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <Link href="/about" className="text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-primary">
                Terms of Services
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-primary">
                Privacy of Policy
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-primary">
                Cookies Policy
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            © Copyright MIXIT. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
