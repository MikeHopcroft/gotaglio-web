import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

import type {IService} from '../dataModel';

import './App.css';
import DetailPane from './DetailPane';
import Frame from './Frame';
import Home from './Home';
import RecordEditor from './RecordEditor';
import {RouteDataProvider2} from './RouteDataLoader2';

type AppProps = {
  service: IService;
};

function App({service}: AppProps) {
  return (
    <BrowserRouter>
      <RouteDataProvider2 service={service}>
        <Routes>
          <Route path="/frame" element={<Frame />}>
            <Route path="projects/:projectId" element={<Outlet />}>
              <Route path="annotations/:annotationId" element={<Outlet />}>
                <Route path="sessions/:sessionId" element={<DetailPane />} />
                <Route index element={<DetailPane />} />
              </Route>
              <Route path="suites/:suiteId" element={<Outlet />}>
                <Route path="cases/:caseId" element={<RecordEditor />} />
                <Route index element={<DetailPane />} />
              </Route>
              <Route path="runs/:runId" element={<DetailPane />} />
              <Route index element={<DetailPane />} />
            </Route>
            <Route index element={<RecordEditor />} />
          </Route>
          <Route index element={<Home />} />
        </Routes>
      </RouteDataProvider2>
    </BrowserRouter>
  );
}

// function Loading() {
//   return <div className="text-red-500">Loading...</div>;
// }

// async function loader({params}: LoaderFunctionArgs) {
//   console.log('loader', params);
//   return {
//     user: {name: 'John Doe'} as User,
//     activity: [
//       {id: 1, description: 'activey 1'},
//       {id: 2, description: 'activey 2'},
//     ] as Activity[],
//   };
// }

export default App;
