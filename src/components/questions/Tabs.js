import React from 'react';
import { Link } from 'gatsby';

export default ({ total }) => (
  <div className="flex justify-between items-center my-4 pt-4">
    <ul className="flex text-sm text-medium-on-surface-0">
      <li className="cursor-pointer">
        <Link to="/questions/active" className="px-1" activeClassName="border-b-2 border-accent">Active</Link>
      </li>
      <li className="cursor-pointer px-4">
        <Link to="/questions/recent" className="px-1" activeClassName="border-b-2 border-accent">Most recent</Link>
      </li>
      <li className="cursor-pointer">
        <Link to="/questions/answered" className="px-1" activeClassName="border-b-2 border-accent">Answered</Link>
      </li>
    </ul>
    <div className="text-xs text-medium-on-surface-0">{total} questions</div>
  </div>
);
