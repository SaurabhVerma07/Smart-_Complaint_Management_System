import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getStatusStyles } from '../utils/statusHelpers';

export const StatusBadge = ({ status, className }) => {

  return (
    <span className={twMerge(clsx('px-2.5 py-0.5 rounded-full text-xs font-medium border', getStatusStyles(status), className))}>
      {status}
    </span>
  );
};
