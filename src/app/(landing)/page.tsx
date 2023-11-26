import { RepositoryProvider } from '@/providers/RepositoryProvider';
import Graph from './sections/Graph';
import Sidebar from './sections/Sidebar';

export default function Home() {
  return (
    <RepositoryProvider>
      <main className='flex h-screen'>
        <div className='flex-grow'>
          <Graph />
        </div>
        <div className='w-[512px] flex-shrink-0'>
          <Sidebar />
        </div>
      </main>
    </RepositoryProvider>
  );
}
