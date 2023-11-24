import { RepoProvider } from '@/providers/RepoContext';
import Sidebar from './sections/Sidebar';
import Graph from './sections/Graph';

export default function Home() {
  return (
    <RepoProvider>
      <main className='flex h-screen '>
        <div className='flex-grow'>
          <Graph />
        </div>
        <div className='w-[512px] flex-shrink-0'>
          <Sidebar />
        </div>
      </main>
    </RepoProvider>
  );
}
