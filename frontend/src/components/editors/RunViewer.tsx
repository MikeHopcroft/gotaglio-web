import React from 'react';

function RunViewer({group = false}) {
  if (group) {
    return (
      <>
        <h1 className="h1">Run Instructions</h1>
      </>
    );
  } else {
    return (
      <>
        <h1>Run Viewer</h1>
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
