import RepoCard from '@/components/RepoCard';
import React from 'react';

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <aside className='col-span-3 bg-primary px-8 pt-20'>
      <br />
      <RepoCard
        repoFullName='octocat/Hello-World'
        stars={2100}
        lastUpdate='2011-01-26T19:14:43Z'
      ></RepoCard>
    </aside>
  );
}
