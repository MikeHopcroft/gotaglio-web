import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'

import CaseDetail from './CaseDetail';
import SuiteHome from './SuiteHome';
import SuiteLayout from './SuiteLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/suite/:suiteId" element={<SuiteLayout />}>
          <Route index element={<SuiteHome />} />
          <Route path="case/:caseId" element={<CaseDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
