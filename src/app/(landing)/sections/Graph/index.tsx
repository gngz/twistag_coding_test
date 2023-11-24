'use client';
import { RepoContext } from '@/providers/RepoContext';
import React, { useContext } from 'react';

type Props = {};

export default function Graph({}: Props) {
  const context = useContext(RepoContext);

  return <div>{JSON.stringify(context)}</div>;
}
