import React from 'react';

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-100 bg-gray-100 p-4 overflow-y-auto">
      {children}
    </div>
  );
}

export default Sidebar;
