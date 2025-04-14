import React from 'react';

import type {MasterDetailData} from '../dataModel';

import {useRouteData} from './RouteDataLoader2';

function DetailPane() {
    const {data, isLoading, error} = useRouteData();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    const {detail, type} = data as MasterDetailData;

    return (
      <>
        <div>{type} Editor</div>
        <pre>
          {JSON.stringify(detail, null, 2)}
        </pre>
      </>
    );
  }
}

export default DetailPane;
