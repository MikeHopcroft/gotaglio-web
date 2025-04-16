import React, {JSX} from 'react';
import {Outlet, Route} from 'react-router-dom';

import DebugPane from './editors/DebugPane';
import DetailPane from './editors/DetailPane';

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

function TreeRoutes() {
  return <>{buildRoutesHelper(treeSpec, treeIds)}</>;
}

function buildRoutesHelper(spec: TreeSpec, ids: TreeIds): JSX.Element[] {
  return Object.entries(spec).map(([key, value]) => (
    <Route key={key} path={key} element={<Outlet />}>
      <Route path={`:${ids[key]}`} element={<Outlet />}>
        {value && buildRoutesHelper(value, ids)}
        <Route index element={<DetailPane type={key} />} />
      </Route>
      <Route index element={<DebugPane />} />
    </Route>
  ));
}

export default TreeRoutes;
