type Props = {
  repoName: string;
};

export default function SearchInputResult({ repoName }: Props) {
  const repoSplit = repoName.split('/');
  const user = repoSplit.at(0);
  const repo = repoSplit.at(1);

  return (
    <>
      <span className='text-input-result-light'>{user} / </span>
      <span className='font-bold'>{repo}</span>
    </>
  );
}
