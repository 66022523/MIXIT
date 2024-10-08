"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });

export default function CreatePostModal() {
    const router = useRouter();
    const dialogRef = useRef();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); // สำหรับหลายรูป
    const [selectedGIF, setSelectedGIF] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [showGIFs, setShowGIFs] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("excited");
    const [selectedCommunity, setSelectedCommunity] = useState("");
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);

    const communities = ["Community 1", "Community 2", "Community 3"];

    const user = {
        id: "user-id",
        name: "username",
    };

    const handleDismiss = () => {
        router.back();
    };

    const fetchGIFs = () => {
        const apiKey = "API_KEY";
        const clientKey = "my_test_app";
        const limit = 8;
        const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`;

        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                setGifs(data.results || []);
            })
            .catch((error) => console.error("Error fetching GIFs:", error));
    };

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const { data, error } = await supabase
            .from("posts")
            .insert({
                user_id: user.id,
                username: user.name,
                title: title,
                content: content,
                tags: tags.join(", "),
                community: selectedCommunity,
                gif_url: selectedGIF,
            })
            .single();

        if (error) {
            console.error("Error adding post:", error);
            setLoading(false);
            return;
        }

        const postId = data.id;

        if (selectedFiles.length > 0) {
            await Promise.all(selectedFiles.map(async (file, index) => {
                const fileName = `${postId}_${index}_${new Date().getTime()}`;
                const { error: uploadError } = await supabase.storage
                    .from("post-images")
                    .upload(fileName, file, {
                        contentType: file.type,
                    });

                if (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    setLoading(false);
                    return;
                }

                const { publicURL } = supabase.storage
                    .from("post-images")
                    .getPublicUrl(fileName);

                await supabase
                    .from("posts")
                    .update({ image_url: publicURL })
                    .eq("id", postId);
            }));
        }

        setLoading(false);
        setTitle("");
        setContent("");
        setTags([]);
        setSelectedFiles([]);
        setSelectedGIF(null);
        setSelectedCommunity("");
    };

    const addImagesToPost = (e) => {
        const files = Array.from(e.target.files); // เปลี่ยนเป็น Array สำหรับหลายรูป
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const removeImage = (index) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newSelectedFiles);
    };

    const addEmoji = (e) => {
        if (activeField === "title") {
            setTitle(title + e.native);
        } else if (activeField === "content") {
            setContent(content + e.native);
        }
    };

    const addTag = (e) => {
        if (e.key === "Enter" && e.target.value) {
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    };

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="modal backdrop-blur">
            <div className="modal-box rounded-badge bg-opacity-90 text-center" style={{ width: "80%", maxWidth: "40%", height: "auto" }}>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-circle btn-primary btn-sm">
                        <QuestionMarkCircleIcon className="size-6" />
                    </button>
                    <form method="dialog">
                        <button className="btn btn-circle btn-primary btn-sm">
                            <XCircleIcon className="size-6" />
                        </button>
                    </form>
                </div>
                <h2 className="mb-4 text-2xl font-bold">Create a Post</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your post topic"
                    className="input input-bordered mb-3 w-full"
                    onFocus={() => setActiveField("title")}
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content"
                    rows="3"
                    className="textarea textarea-bordered mb-3 w-full"
                    onFocus={() => setActiveField("content")}
                />

                <input type="text" placeholder="Add a tag and press Enter" onKeyDown={addTag} className="input input-bordered mb-3 w-full" />
                <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="rounded bg-gray-200 px-2 py-1">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* แสดงรูปที่ถูกเลือกทั้งหมด */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="relative">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt="Selected file"
                                width={150}
                                height={150}
                                className="rounded-lg"
                            />
                            <button
                                className="absolute top-0 right-0"
                                onClick={() => removeImage(index)}
                            >
                                <XCircleIcon className="h-6 w-6 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>

                {selectedGIF && (
                    <div>
                        <Image src={selectedGIF} alt="Selected GIF" />
                        <button onClick={() => setSelectedGIF(null)}>Remove GIF</button>
                    </div>
                )}

                <div className="flex items-center space-x-3">
                    <button onClick={() => { setShowGIFs(!showGIFs); fetchGIFs(); }} className="btn">
                        GIF
                    </button>

                    {showGIFs && (
                        <div>
                            <input
                                type="text"
                                placeholder="Search GIFs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered mb-3 w-full"
                            />
                            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-auto">
                                {gifs.map((gif, index) => (
                                    <Image
                                        key={index}
                                        src={gif.media_formats.gif.url}
                                        alt="GIF"
                                        onClick={() => {
                                            setSelectedGIF(gif.media_formats.gif.url);
                                            setShowGIFs(false);
                                        }}
                                        style={{ width: "100px", height: "100px", cursor: "pointer" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <button onClick={() => filePickerRef.current.click()} className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    </button>
                    <input type="file" ref={filePickerRef} hidden multiple onChange={addImagesToPost} />

                    <div className="relative">
                        <button onClick={() => setShowEmojis(!showEmojis)} className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                        </button>

                        {showEmojis && (
                            <div className="absolute top-full z-10 mt-2">
                                <Picker onEmojiSelect={addEmoji} theme="dark" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="btn btn-primary mt-4 w-full" disabled={!title || !content || !selectedCommunity} onClick={sendPost}>
                    Post
                </button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
