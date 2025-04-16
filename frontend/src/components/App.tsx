import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import type {IService} from '../dataModel';

import './App.css';
import Frame from './Frame';
import Home from './Home';
import TreeRoutes from './TreeRoutes';
import RouteDataProvider from './RouteDataProvider';

type AppProps = {
  service: IService;
};
// 
function App({service}: AppProps) {
  return (
    <BrowserRouter>
      <RouteDataProvider service={service}>
        <Routes>
          <Route path="/frame" element={<Frame />}>
            {TreeRoutes()}
          </Route>
          <Route index element={<Home />} />
        </Routes>
      </RouteDataProvider>
    </BrowserRouter>
  );
}

export default App;
