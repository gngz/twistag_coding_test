import { Search } from 'react-feather';

export default function EmptyState() {
  return (
    <div className='flex flex-col items-center gap-6 rounded-2xl bg-primary-dark px-[68px] py-11'>
      <Search size={64} color='#BCBCF2' />
      <span className='text-center text-empty-text'>
        Search for a GitHub repository to populate graph
      </span>
    </div>
  );
}
