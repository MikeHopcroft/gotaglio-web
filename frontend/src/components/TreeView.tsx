import React from 'react';
import {NavLink} from 'react-router-dom';

import type {MasterDetailData, TreeNode} from '../dataModel';

import {useRouteData} from './RouteDataLoader2';

export default function TreeView() {
  const {data, isLoading, error, reload} = useRouteData();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <TreeNodeComponent node={(data as MasterDetailData).tree} />
      </>
    );
  }
}

type TreeNodeProps = {
  node: TreeNode;
  path?: string;
  root?: boolean;
};

function TreeNodeComponent({node, path = '', root = true}: TreeNodeProps) {
  const fullPath = root ? '/frame/' : `${path}${node.type}/${node.id}/`;

  return (
    <div className={`${root ? '' : 'pl-3'}`}>
      {!root && (
        <>
          <NavLink
            to={fullPath}
            end
            title={node.description}
            className={({isActive}) => (isActive ? 'active' : 'inactive')}
          >
            {node.name}
          </NavLink>
        </>
      )}{' '}
      <div className={`${root ? '' : 'pl-3'}`}>
        {Object.entries(node.children).map(([key, children]) => (
          <div key={key}>
            <div className="text-red-500 font-bold">
              {key}{' '}
              <button
                className="ml-1 w-6 h-6 bg-blue-500 text-white text-sm items-center justify-center rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                title={`Add ${key}`}
              >
                +
              </button>
            </div>
            {children.map((child: TreeNode) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                path={fullPath}
                root={false}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
