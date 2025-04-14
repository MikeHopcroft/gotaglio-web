import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

import type {IService} from '../dataModel';

import './App.css';
import DetailPane from './DetailPane';
import Frame from './Frame';
import Home from './Home';
import RecordEditor from './RecordEditor';
import {RouteDataProvider} from './RouteDataProvider';

type AppProps = {
  service: IService;
};

function App({service}: AppProps) {
  return (
    <BrowserRouter>
      <RouteDataProvider service={service}>
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
          </Route>
          <Route index element={<Home />} />
        </Routes>
      </RouteDataProvider>
    </BrowserRouter>
  );
}

export default App;
