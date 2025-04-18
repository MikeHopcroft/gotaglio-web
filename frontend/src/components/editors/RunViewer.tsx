import React from 'react';

import Instructions from '../Instructions';
import Markdown from '../Markdown';

const text = `
# Runs

_Runs_ store the results of a pipeline run associated with
a _Suite_ of _Cases_. _Runs_ are immutable, but can be
annotated and used to supply the configuration for future runs.
`;

function RunViewer({group = false}) {
  if (group) {
    return (
      <>
        <Markdown>{text}</Markdown>
        <Instructions type="Run" />
      </>
    );
  } else {
    return (
      <>
        <h1 className='h1'>Run Viewer</h1>
        <label className="text-xs text-gray-500 mt-1 block m-0">Name</label>
        <div className="flex space-x-2 items-start">
          <div className="flex-1"></div>
        </div>

        <label className="text-xs text-gray-500 mt-1 block m-0">
          Description
        </label>
        <div className="flex space-x-2 items-start">
          <div className="flex-1"></div>
        </div>
      </>
    );
  }
}

export default RunViewer;
