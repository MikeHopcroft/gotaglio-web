import React from 'react';

import Sidebar from './Sidebar';
import TreeView from './TreeView';

function Middle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>
        <TreeView/>
      </Sidebar>
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {children}
      </div>
    </div>
  );
}

export default Middle;
