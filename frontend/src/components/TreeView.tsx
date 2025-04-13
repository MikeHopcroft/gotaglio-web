import React from 'react';
import {NavLink} from 'react-router-dom';

import {TreeNode} from '../backend';

import {tree1, tree2} from './sampleData';

type TreeViewProps = {
  routeBuilder: (prefix: string, node: TreeNode) => string;
};

export default function TreeView({routeBuilder}: TreeViewProps) {
  return <TreeNodeComponent node={tree2} routeBuilder={routeBuilder} />;
}

type TreeNodeProps = {
  node: TreeNode;
  routeBuilder: (prefix: string, node: TreeNode) => string;
  path?: string;
  root?: boolean;
};

function TreeNodeComponent({
  node,
  path = '',
  routeBuilder,
  root = true,
}: TreeNodeProps) {
  const fullPath = routeBuilder(path, node);
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
                routeBuilder={routeBuilder}
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
