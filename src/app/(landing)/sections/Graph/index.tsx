'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { RepoContext } from '@/providers/RepoContext';
import React, { useContext, useMemo } from 'react';
import { RepositoryModel } from '@/models/repository';
import CustomTooltip from '@/components/CustomTooltip';

type Props = {};

function parseData(data: RepositoryModel[]) {
  const parsedData = new Array<Record<string, number | string>>();
  for (let week = 0; week < 52; week++) {
    const weekEntry: Record<string, number | string> = {};
    weekEntry['week'] = week;
    for (const repo of data) {
      weekEntry[repo.full_name] = repo.stats ? repo.stats[week] : 0;
    }
    parsedData.push(weekEntry);
  }
  return parsedData;
}

export default function Graph({}: Props) {
  const context = useContext(RepoContext);
  const parsedData = useMemo(() => {
    return parseData(context);
  }, [context]);

  return (
    <ResponsiveContainer className='p-10'>
      <LineChart data={parsedData}>
        {context.map((repo) => (
          <Line
            key={repo.id}
            type='monotone'
            dataKey={repo.full_name}
            stroke={repo.color}
            strokeOpacity={0.3}
            dot={{ strokeWidth: 2, stroke: repo.color, fill: 'white', r: 6 }}
            activeDot={{ fill: repo.color, strokeWidth: 0, r: 6 }}
            strokeWidth={3}
          />
        ))}
        <Tooltip content={<CustomTooltip />} />
        <XAxis
          strokeWidth={3}
          stroke='#37374A'
          tick={<></>}
          tickLine={true}
          mirror
          dataKey='week'
        />
        <YAxis
          strokeWidth={3}
          stroke='#37374A'
          tick={<></>}
          tickLine={true}
          mirror
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
