import React from 'react';
import { Tag } from '@/components/tag';

function Tags() {
  const historyTags = ['#Tag1', '#Tag2', '#Tag3', '#Tag4'];
  const popularTags = ['#Tag1', '#Tag2', '#Tag3', '#Tag4'];
  const lines = Array(75).fill('—').join('');

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-8">
      <div>
        <h1 className="font-bold mb-2">Game community.</h1>
        <span style={{ whiteSpace: 'nowrap' }}>{lines}</span>
        <div className="flex gap-2 flex-wrap">
          {historyTags.map((tag, index) => (
            <button
            key={index}
            className="btn btn-sm no-animation btn-ghost btn-outline"
          >
            {tag}
          </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="font-bold mb-2">Tags.</h1>
        <span style={{ whiteSpace: 'nowrap' }}>{lines}</span>
        <div className="flex gap-2 flex-wrap">
          {popularTags.map((tag, index) => (
            <button
              key={index}
              className="btn btn-sm no-animation btn-ghost btn-outline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;