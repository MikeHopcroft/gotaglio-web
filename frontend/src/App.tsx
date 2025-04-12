import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import CaseDetail from './CaseDetail';
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
        <Route path="/tree" element={<TreeView />} />
        <Route index element={<h1>Default route</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
