import Sidebar from './sections/Sidebar';

export default function Home() {
  return (
    <main className='gap grid h-screen grid-cols-8'>
      <div className='col-span-5'></div>
      <Sidebar />
    </main>
  );
}
