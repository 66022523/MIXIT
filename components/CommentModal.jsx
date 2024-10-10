"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { XCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });

export default function CommentModal() {
    const dialogRef = useRef();
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedGIF, setSelectedGIF] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [showGIFs, setShowGIFs] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("excited");
    const filePickerRef = useRef(null);

    const fetchGIFs = () => {
        const apiKey = process.env.NEXT_PUBLIC_TENOR_API_KEY;
        const clientKey = process.env.NEXT_PUBLIC_TENOR_CLIENT_KEY;
        const limit = 8;
        const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`;

        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                setGifs(data.results || []);
            })
            .catch((error) => console.error("Error fetching GIFs:", error));
    };

    const sendComment = () => {
        console.log("Comment submitted:", content);
    };

    const addImagesToComment = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const removeImage = (index) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newSelectedFiles);
    };

    const addEmoji = (e) => {
        setContent(content + e.native);
    };

    const addTag = (e) => {
        if (e.key === "Enter" && e.target.value) {
            setTags([...tags, e.target.value]);
            e.target.value = "";
        }
    };

    const removeTag = (index) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
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
                <h2 className="mb-4 text-2xl font-bold">Comment</h2>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your comment"
                    rows="3"
                    className="textarea textarea-bordered mb-3 w-full"
                />

                <input type="text" placeholder="Add a tag and press Enter" onKeyDown={addTag} className="input input-bordered mb-3 w-full" />
                <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full">
                            {tag}
                            <button className="ml-2" onClick={() => removeTag(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>

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
                    <div className="relative">
                        <Image src={selectedGIF} alt="Selected GIF" width={150} height={150} />
                        <button className="absolute top-0 right-0" onClick={() => setSelectedGIF(null)}>
                            <XCircleIcon className="h-6 w-6 text-red-500" />
                        </button>
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
                                    <div key={index} className="relative cursor-pointer" onClick={() => {
                                        setSelectedGIF(gif.media_formats.gif.url);
                                        setShowGIFs(false);
                                    }}>
                                        <Image
                                            src={gif.media_formats.gif.url}
                                            alt="GIF"
                                            width={150}
                                            height={150}
                                        />
                                    </div>
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
                    <input type="file" ref={filePickerRef} hidden multiple onChange={addImagesToComment} />

                    <div className="relative">
                        <button onClick={() => setShowEmojis(!showEmojis)} className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>

                        </button>

                        {showEmojis && (
                            <div className="absolute top-full z-10 mt-2">
                                <Picker onEmojiSelect={addEmoji}/>
                            </div>
                        )}
                    </div>
                </div>

                <button className="btn btn-primary mt-4 w-full" disabled={!content || !tags.length} onClick={sendComment}>
                    Submit Comment
                </button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
