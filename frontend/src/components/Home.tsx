import React from 'react';

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Gotaglio Web Client</h1>
      Useful links
      <ul className="list-disc pl-5">
        <li>
          <a href="/frame/projects/1/suites/1/" className="text-blue-500 underline hover:text-blue-700">Suite 1</a>
        </li>
        <li>
          <a href="/frame/projects/1/suites/1/cases/1/" className="text-blue-500 underline hover:text-blue-700">Suite 1, case 1</a>
        </li>
        <li>
          <a href="/frame" className="text-blue-500 underline hover:text-blue-700">Frame</a>
        </li>
      </ul>
    </>
  );
}
