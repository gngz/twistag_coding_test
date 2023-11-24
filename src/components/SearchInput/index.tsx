'use client';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Search } from 'react-feather';

type Props<T> = {
  results: T[];
  onQuery: (query: string) => void;
  onResultSelect: (result: T) => void;
  renderResult: (result: T) => React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLInputElement>, 'results'>;

export default function SearchInput<T>({
  results,
  onQuery,
  onResultSelect,
  renderResult,
  ...other
}: Props<T>) {
  return (
    <div className='relative'>
      <div
        className={classNames(
          'relative flex h-[60px] items-center overflow-hidden rounded bg-white px-6',
          { 'rounded-b-none': results.length > 0 }
        )}
      >
        <input
          type='text'
          className='h-full flex-grow pl-0 text-input focus:outline-0'
          onChange={(e) => {
            onQuery(e.target.value);
          }}
          {...other}
        />
        <Search size={24} />
      </div>
      <div className='absolute top-full z-10 w-full bg-white'>
        {results.map((result, idx) => (
          <button
            className='flex h-[44px] w-full items-center px-6 hover:bg-search-hover'
            key={idx}
            onClick={() => {
              onResultSelect(result);
            }}
          >
            {renderResult(result)}
          </button>
        ))}
      </div>
    </div>
  );
}
