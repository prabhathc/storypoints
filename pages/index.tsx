import Image from 'next/image';
import icon from '../public/tiktok.svg';

export default function Home() {

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="flex justify-center m-6 h-40">
            <Image className="hover:rotate-360 duration-1000 ease-in-out " src={icon} alt="Stopwatch logo" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Estimate level of effort efficiently, together.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A tool designed to engage teams in goal setting discussion.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#_" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-brown border-2 border-white rounded-md hover:text-white sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                Learn more
              </a>
              <a href="#_" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-brown bg-white rounded-md sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                Get started
                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}