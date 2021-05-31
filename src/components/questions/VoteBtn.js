import React from 'react';

export default ({ id, vote, voteHandler, active = false }) => (
  <a
    className={`${
      active ? 'bg-accent text-white' : 'bg-transparent text-accent cursor-pointer'
    } py-1 px-4 text-sm border border-accent rounded shadow-sm inline-block text-center w-16`}
    onClick={() => !active && voteHandler({ id })}
  >
    {vote}
  </a>
);
