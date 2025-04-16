import {PlusCircleIcon} from '@heroicons/react/24/outline';
import React from 'react';
import {NavLink} from 'react-router-dom';

import type {MasterDetailData, TreeNode} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

export default function TreeView() {
  const {data, isLoading, error} = useRouteData();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    console.log('aaa');
    console.log(JSON.stringify(data, null, 2));

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
            replace
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
            <div className="text-red-500 font-bold flex items-center">
              <NavLink
                to={`${fullPath}${key}/`}
                end
                replace
                title={node.description}
                className={({isActive}) => (isActive ? 'active' : 'inactive')}
              >
                {key}
              </NavLink>

              <button
                className="ml-1 inline-flex items-center justify-center bg-transparent p-0 hover:bg-gray-100 rounded-full"
                title={`Add ${key}`}
              >
                <PlusCircleIcon className="size-6 text-blue-500 hover:text-blue-700" />
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
