import React from 'react';

import {TreeNode} from './backend';

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

export default function TreeView() {
  return <TreeNodeComponent node={tree} />;
}

type TreeNodeProps = {
  node: TreeNode;
};

function TreeNodeComponent({node}: TreeNodeProps) {
  return (
    <div className="pl-8">
      <div title={node.description}>{node.name}</div>
      <div className="pl-8">
        {Object.entries(node.children).map(([key, children]) => (
          <div key={key}>
            <div className="pl-8">
              {key}
              {children.map((child: TreeNode) => (
                <TreeNodeComponent key={child.id} node={child} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
