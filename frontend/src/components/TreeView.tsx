import React from 'react';
import {NavLink} from 'react-router-dom';

import {TreeNode} from '../backend';

const tree: TreeNode = {
  id: 0,
  type: 'root',
  name: 'root',
  description: 'root',
  children: {
    projects: [
      {
        id: 1,
        type: 'Project',
        name: 'Project 1',
        description: 'Description for Project 1',
        children: {},
      },
      {
        id: 2,
        type: 'Project',
        name: 'Project 2',
        description: 'Description for Project 2',
        children: {
          suites: [
            {
              id: 4,
              type: 'Suite',
              name: 'Suite 4',
              description: 'Description for Suite 4',
              children: {},
            },
            {
              id: 5,
              type: 'Suite',
              name: 'Suite 5',
              description: 'Description for Suite 5',
              children: {},
            },
            {
              id: 6,
              type: 'Suite',
              name: 'Suite 6',
              description: 'Description for Suite 6',
              children: {
                cases: [
                  {
                    id: 13,
                    type: 'Case',
                    name: 'Description for Case 13',
                    description: '46571d41-4d30-4923-b8a1-5fd80dc4d642',
                    children: {},
                  },
                  {
                    id: 14,
                    type: 'Case',
                    name: 'Description for Case 14',
                    description: 'ca18a32b-07cf-4884-9d5c-9e0d3b9ba5dc',
                    children: {},
                  },
                ],
              },
            },
            {
              id: 7,
              type: 'Suite',
              name: 'Suite 7',
              description: 'Description for Suite 7',
              children: {},
            },
          ],
          runs: [
            {
              id: 4,
              type: 'Run',
              name: 'e40a7465-33a1-4dd2-b5a2-cd9179dc4f4f',
              description: 'Run 4',
              children: {},
            },
            {
              id: 5,
              type: 'Run',
              name: '66631914-b8a8-4f76-8307-e39ba320a6dc',
              description: 'Run 5',
              children: {},
            },
            {
              id: 6,
              type: 'Run',
              name: '5b1754a8-c395-4633-996b-4ee1950d18f0',
              description: 'Run 6',
              children: {},
            },
          ],
        },
      },
      {
        id: 3,
        type: 'Project',
        name: 'Project 3',
        description: 'Description for Project 3',
        children: {},
      },
    ],
  },
};

type TreeViewProps = {
  routeBuilder: (prefix: string, node: TreeNode) => string;
};

export default function TreeView({routeBuilder}: TreeViewProps) {
  return <TreeNodeComponent node={tree} routeBuilder={routeBuilder} />;
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
