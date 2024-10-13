import React from 'react';
import CommunityCard from '@/components/CirclesCard';

export default function circles() {
    const communities = [
        {
            id: '1',
            name: 'Zenless Zone Zero',
            description: 'The commuvity server for Zenless Zone Zero, all-new urban fantasy ARPG.',
            imageUrl: 'https://i.pinimg.com/564x/63/43/17/63431709ca0e3db05165472e6a75362d.jpg',
        },
        {
            id: '2',
            name: 'Honkai: Star Rail',
            description: 'The commuvity server for Wuthering Waves, a place for fans to connect.',
            imageUrl: 'https://i.pinimg.com/564x/00/33/da/0033da539fb6649697f13c33804cd3d0.jpg',
        },
        {
            id: '3',
            name: 'Genshin Impact',
            description: 'Welcome to Teyvat, Traveler! Discuss with others about Genshin Impact!',
            imageUrl: 'https://i.pinimg.com/564x/05/11/52/051152a545d0bb889d8074f0d2ee3647.jpg',
        },
        {
            id: '4',
            name: 'Honkai impact 3rd',
            description: 'Honkai Impact 3rd is a free-to-play 3D action role-playing game developed by miHoYo.',
            imageUrl: 'https://i.pinimg.com/564x/8d/1e/91/8d1e91a855ebc4d65bc339b32ebeeece.jpg',
        },
        {
            id: '5',
            name: 'Wuthering Waves',
            description: 'MMORPG mobile game that features an open world and a variety of gameplay systems.',
            imageUrl: 'https://i.pinimg.com/736x/8e/e2/fa/8ee2fa8374ccaa5b95f3b030abe34bdc.jpg',
        },
        {
            id: '6',
            name: 'MineCraft',
            description: 'Sandbox game where players can build, explore, and survive in a blocky 3D world!',
            imageUrl: 'https://i.pinimg.com/564x/29/a0/b4/29a0b495840516b71597e6674fe72256.jpg',
        },
        {
            id: '7',
            name: 'Valorant',
            description: 'Team shooter with a gameplay system that requires both skill and strategy. Players will be divided into teams to fight.',
            imageUrl: 'https://i.pinimg.com/564x/49/61/01/496101d6ff5ff7b10921c696b0d7c610.jpg',
        },
        {
            id: '8',
            name: 'Fortnite',
            description: 'Battle royale game that combines combat and building by the player, you have to survive on a large island.',
            imageUrl: 'https://i.pinimg.com/564x/2b/02/f0/2b02f09dda89cfbef21b7bc3eea90fc4.jpg',
        },
        {
            id: '9',
            name: 'Roblox',
            description: 'Online gaming platform where users can create and play a wide variety of 3D games.',
            imageUrl: 'https://i.pinimg.com/564x/33/4a/16/334a16440061d75db5292d29bbd6df0d.jpg',
        },
    ];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Recommended Communities</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communities.map((community) => (
                    <CommunityCard
                        key={community.id}
                        id={community.id}
                        name={community.name}
                        description={community.description}
                        imageUrl={community.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
}