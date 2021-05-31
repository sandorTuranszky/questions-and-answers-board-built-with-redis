import React, { useState } from 'react';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import avatar from '../../images/profile-pic.jpeg';
import Ask from './Ask';

export default () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="w-2/12 md:w-1/12 flex-shrink-0 rounded-full">
          <PreviewCompatibleImage
            imageInfo={{
              image: avatar,
              alt: "It's me around 5 years ago",
            }}
            style={{ overflow: 'initial' }}
            className="h-8 w-8 rounded-full inline-block"
          />
        </div>
        <div className="w-10/12 md:w-11/12 text-left leading-8">
          <input
            onClick={() => setOpen(true)}
            type="button"
            className="px-4 bg-transparent text-accent font-medium cursor-pointer border border-accent rounded"
            value="Ask me a tech question"
          />
        </div>
      </div>
      <Ask open={open} closeModal={closeModal} />
    </>
  );
};
