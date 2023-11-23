import { DateTime } from 'luxon';
import React from 'react';
import { Star } from 'react-feather';

type Props = {
  repoFullName: string;
  stars: number;
  lastUpdate: string;
};

function numberFormat(n: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(n);
}

export default function RepoCard({ repoFullName, stars, lastUpdate }: Props) {
  const relativeTime = DateTime.fromISO(lastUpdate, {
    locale: 'en',
  }).toRelative();

  const repoNames = repoFullName.split('/');

  return (
    <div className='flex flex-col gap-2 rounded border-l-8 border-l-lime-500 bg-secondary px-6 py-4 text-white'>
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
  );
}
