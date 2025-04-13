import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

import {suite} from './sample-data';

function SuiteLayout() {
  // const {suiteId} = useParams();
  const suiteId = "1"; //suite.name;
  const cases = suite.cases;

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="h-16 bg-red-800 text-white flex items-center px-4 shadow-md">
        <h1 className="text-xl font-bold">My App</h1>
      </div>

      {/* Content below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-100 bg-gray-100 p-4 overflow-y-auto">
          <NavLink
            to={`/suite/1`}
            end
            // to={encodeURI(`/suite/${suite.name}`)}
            // to={`/suite/${encodeURIComponent(suite.name)}`}
            className={({isActive}) => (isActive ? 'active' : 'inactive')}
          >
            Suite: {suiteId}
          </NavLink>
          {/* Add enough content to test scrolling */}
          {cases.map(x => (
            <div key={x.uuid}>
              <NavLink
                to={`/suite/1/case/${x.uuid}`}
                className={({isActive}) => (isActive ? 'active' : 'inactive')}
              >
                {x.uuid}
              </NavLink>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SuiteLayout;
