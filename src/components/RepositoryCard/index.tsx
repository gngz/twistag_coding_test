'use client';

import classNames from 'classnames';
import { DateTime } from 'luxon';
import React from 'react';
import { Star } from 'react-feather';
import DeleteButton from './DeleteButton';

type Props = {
  repoFullName: string;
  stars: number;
  lastUpdate: string;
  color: React.CSSProperties['color'];
  dim?: boolean;
  onRemove?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function numberFormat(n: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(n);
}

function getRelativeTime(isoDate: string) {
  return DateTime.fromISO(isoDate, {
    locale: 'en',
  }).toRelative();
}

export default function RepositoryCard({
  repoFullName,
  stars,
  lastUpdate,
  color,
  dim,
  onRemove,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const relativeTime = getRelativeTime(lastUpdate);
  const mouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter && onMouseEnter(e);
  };

  const mouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave && onMouseLeave(e);
  };

  const repoNames = repoFullName.split('/');

  return (
    <div
      className={classNames(
        'repo-card group flex justify-between rounded bg-secondary px-6 py-4 text-white',
        { 'opacity-30': dim }
      )}
      style={{ '--repo-color': color } as React.CSSProperties}
      role='button'
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className='flex flex-col gap-2'>
        <div className='text-lg'>
          <span className='text-light-text'>{repoNames[0]} / </span>
          <span className='font-bold'>{repoNames[1]}</span>
        </div>
        <div className='flex gap-2 text-sm'>
          <div className='flex items-center gap-1'>
            <Star size={16} />
            <span className='font-bold'>{`${numberFormat(stars)}`}</span>
          </div>
          <div>Updated {relativeTime}</div>
        </div>
      </div>
      <div className='hidden items-center group-hover:flex'>
        <DeleteButton onClick={() => onRemove && onRemove()} />
      </div>
    </div>
  );
}
