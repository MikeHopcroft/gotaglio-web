import React from 'react';

import type {MasterDetailData} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

function updateStringVersion(input: string): string {
  const regex = / - updated (\d+)$/;
  const match = input.match(regex);

  if (match) {
    const version = parseInt(match[1], 10);
    return input.replace(regex, ` - updated ${version + 1}`);
  } else {
    return `${input} - updated 1`;
  }
}

function DetailPane() {
  const {data, isLoading, error, update} = useRouteData();

  const performUpdate = () => {
    if (data) {
      const updatedRecord = {
        ...data?.detail,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name: updateStringVersion((data?.detail as Record<string, any>).name),
      };
      update(data?.type, updatedRecord);
    } else {
      console.error('No data available to update');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    const {detail, type} = data as MasterDetailData;

    return (
      <>
        <div>{type} Editor</div>
        {detail == undefined ? <div>No detail</div> : null}{' '}
        <button
          onClick={performUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <pre>{JSON.stringify(detail, null, 2)}</pre>
      </>
    );
  }
}

export default DetailPane;
