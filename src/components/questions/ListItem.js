import React from 'react';
import moment from 'moment';
import VoteBtn from './VoteBtn';
import Link from '../CustomLink';
import { AccountIcon, LinkIcon } from '../../images/icons';

export default ({
  item: { id, author, datetime, question, score: vote, url = null },
  voteHandler,
  active,
}) => (
  <li className="flex flex-col border rounded p-2 md:p-3 mb-4 bg-gray-100 bg-opacity-25 shadow">
    <div className="flex flex-row justify-between items-center">
      <div className="w-2/12 md:w-1/12">
        <AccountIcon className="inline-block fill-current h-8 w-8 text-disabled-on-surface-0" />
      </div>
      <div className="flex flex-col w-8/12 md:w-9/12 justify-center">
        <div className="text-sm text-high-on-surface-0">{author}</div>
        <div className="text-xs text-disabled-on-surface-0">{moment.unix(datetime).calendar()}</div>
      </div>
      <div className="w-2/12 text-right mr-2 md:mr-1 justify-end">
        <VoteBtn id={id} vote={vote} voteHandler={voteHandler} active={active} disabled={url}/>
      </div>
    </div>

    <div className="flex flex-row justify-between">
      <div className="w-2/12 md:w-1/12 self-center pl-1">
        {url && (
          <Link className="text-xs" to={url} alt="Answer is available">
            <LinkIcon className="inline-block fill-current h-6 w-6 text-blue-500" />
          </Link>
        )}
      </div>
      <div className="w-8/12 md:w-9/12 text-xs text-medium-on-surface-0 py-4 line-clamp-2">
        {question}
      </div>
      <div className="w-2/12"></div>
    </div>
  </li>
);
