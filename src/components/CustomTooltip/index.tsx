import React from 'react';
import { TooltipProps } from 'recharts';
import { GitCommit } from 'react-feather';
import { DateTime } from 'luxon';

function getWeekDate(week: number) {
  const YEAR_WEEKS = 52;
  return DateTime.now().minus({
    weeks: YEAR_WEEKS - week - 1,
  });
}

function formatDate(date: DateTime) {
  return date.toLocaleString(
    { ...DateTime.DATE_FULL, month: 'short' },
    {
      locale: 'en',
    }
  );
}
export default function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<string, number>) {
  if (active) {
    const week = Number(label);
    const commitDate = getWeekDate(week);

    return (
      <div className='tooltip-shadow flex flex-col items-center bg-white px-4 py-2 text-sm'>
        <span className='text-tooltip-text'>
          Week of {formatDate(commitDate)}
        </span>
        <div className='flex flex-col justify-start'>
          {payload &&
            payload.map((data) => {
              return (
                <div key={data.name} className='flex items-center gap-2'>
                  <GitCommit color={data.color} />
                  <span className='font-bold text-black'>
                    {data.value} commits
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
