import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';

import {routeBuilder} from '../backend';

import './App.css';

import CaseDetail from './CaseDetail';
import Frame from './Frame';
import Home from './Home';
import RecordEditor from './RecordEditor';
import SuiteDetail from './SuiteDetail';
import SuiteLayout from './SuiteLayout';
import TreeView from './TreeView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/suite/:suiteId" element={<SuiteLayout />}>
          <Route index element={<SuiteDetail />} />
          <Route path="case/:caseId" element={<CaseDetail />} />
        </Route>
        <Route path="/record" element={<RecordEditor />} />
        <Route
          path="/tree"
          element={<TreeView routeBuilder={routeBuilder} />}
        />
        <Route path="/frame" element={<Frame />}>
          <Route path="projects/:projectId" element={<Outlet/>}>
            <Route path="suites/:suiteId" element={<Outlet />}>
              <Route path="cases/:caseId" element={<RecordEditor />} />
              <Route index element={<h1>Suite Editor</h1>} />
            </Route>
            <Route path="runs/:runId" element={<h1>Run Editor</h1>} />
            <Route index element={<h1>Project Editor</h1>} />
          </Route>
          <Route index element={<RecordEditor />} />
        </Route>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
