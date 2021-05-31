import React from 'react';
import { ErrorIcon } from '../../images/icons';

export default () => (
  <div className="flex flex-col items-center pt-20">
    <ErrorIcon className="block fill-current h-12 w-12 mb-5 text-error" />
    <p className="text-xl mb-10">Something went wrong...</p>
  </div>
);
