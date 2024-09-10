"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TagIcon,
  FunnelIcon,
  Bars3BottomLeftIcon,
  PuzzlePieceIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function Searcher() {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const searchOptions = [
    {
      icon: <TagIcon className="size-5" />,
      name: "Tags",
      value: "tags",
    },
    {
      icon: <Bars3BottomLeftIcon className="size-5" />,
      name: "Posts",
      value: "posts",
    },
    {
      icon: <PuzzlePieceIcon className="size-5" />,
      name: "Games",
      value: "games",
    },
    {
      icon: <UsersIcon className="size-5" />,
      name: "Users",
      value: "users",
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="size-5" />,
      name: "Comments",
      value: "comments",
    },
  ];

  const handleSearch = () => {
    router.push(`/search?keyword=${searchKeyword}&filter=${searchFilter}`);
  };

  return (
    <div className="join hidden rounded-full bg-primary p-1 lg:inline-flex">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle join-item btn-sm"
        >
          <FunnelIcon className="size-5" />
        </div>
        <ul className="menu dropdown-content menu-sm z-[1] mt-6 w-52 rounded-box bg-base-100 shadow">
          {searchOptions.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => setSearchFilter(option.value)}
                className={searchFilter === option.name ? "active" : ""}
              >
                {option.icon}
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-control w-full">
        <input
          type="search"
          className="input input-sm join-item input-ghost border-transparent bg-transparent placeholder:text-primary-content focus:border-transparent focus:bg-transparent focus:outline-none"
          placeholder="Start to search everything..."
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </div>
      <button
        className="btn btn-circle btn-ghost join-item btn-sm text-primary-content"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="size-5" />
      </button>
    </div>
  );
}
