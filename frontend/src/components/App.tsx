import React, {JSX} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

import type {IService} from '../dataModel';

import './App.css';
import DetailPane from './DetailPane';
import Frame from './Frame';
import Home from './Home';
import ProjectEditor from './ProjectEditor';
import RecordEditor from './RecordEditor';
import {RouteDataProvider} from './RouteDataProvider';

type AppProps = {
  service: IService;
};
type TreeIds = Record<string, string>;

const treeIds: TreeIds = {
  projects: 'projectId',
  annotations: 'annotationId',
  sessions: 'sessionId',
  suites: 'suiteId',
  cases: 'caseId',
  runs: 'runId',
};

interface TreeSpec {
  [key: string]: TreeSpec;
}

const treeSpec: TreeSpec = {
  projects: {
    annotations: {
      sessions: {},
    },
    suites: {
      cases: {},
    },
    runs: {},
  },
};

type DetailSpec = (type: string) => JSX.Element;

// TODO: can probably remove detailSpec since <DetailPane />
// can switch on the type. Depends how data driven we want to be.
function detailSpec(type: string): JSX.Element {
  if (type === 'cases') {
    console.log('<RecordEditor />');
    return <RecordEditor />;
  } else if (type === 'projects') {
    return <ProjectEditor />;
  } else {
    console.log('<DetailPane />');
    return <DetailPane />;
  }
}

function buildRoutes(
  spec: TreeSpec,
  ids: TreeIds,
  detail: DetailSpec,
): JSX.Element[] {
  return Object.entries(spec).map(([key, value]) => (
    <Route key={key} path={key} element={<Outlet />}>
      <Route path={`:${ids[key]}`} element={<Outlet />}>
        {value && buildRoutes(value, ids, detail)}
        <Route index element={detail(key)} />
      </Route>
      <Route index element={<DetailPane />} />
    </Route>
  ));
}

function App({service}: AppProps) {
  return (
    <BrowserRouter>
      <RouteDataProvider service={service}>
        <Routes>
          <Route path="/frame" element={<Frame />}>
            {buildRoutes(treeSpec, treeIds, detailSpec)}
          </Route>
          <Route index element={<Home />} />
        </Routes>
      </RouteDataProvider>
    </BrowserRouter>
  );
}

export default App;
