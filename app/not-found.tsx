import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20'>
      <span className='font-mono text-xs text-kumkum tracking-widest uppercase font-semibold mb-3'>
        404 — Page Not Found
      </span>
      <h1 className='font-display text-4xl sm:text-5xl text-khadi font-light mb-4'>
        Lost on the trading floor?
      </h1>
      <p className='text-ash text-sm max-w-md mb-8 leading-relaxed font-light'>
        The textile catalogue or trade route you were looking for cannot be found.
      </p>
      <Link
        href='/'
        className='px-6 py-3 bg-khadi text-warp text-xs tracking-widest uppercase font-medium rounded-xs hover:bg-kumkum transition-colors'
      >
        Return to Surat HQ
      </Link>
    </div>
  );
}
