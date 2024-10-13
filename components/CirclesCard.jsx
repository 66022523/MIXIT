import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CommunityCard = ({ id, name, description, imageUrl, onlineCount, memberCount }) => {
    return (
        <div className="shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg border border-base-300 bg-base-100">
            <div className="h-48 w-full relative">
                <Image
                    src={imageUrl}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-text">{name}</h3>
                <p className="text-text mt-2 line-clamp-3">{description}</p>
                <Link href={`/circles/${id}`}>
                    <button className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-focus transition-colors">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CommunityCard;