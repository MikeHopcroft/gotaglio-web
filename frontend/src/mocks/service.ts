/* eslint-disable @typescript-eslint/no-explicit-any */
import {Path} from '../backend';
import {BaseRecord, TreeNode} from '../dataModel';

import {Index} from './store';

export type NodeMapping = Record<string, (r: Record<string, any>) => TreeNode>;

// Creates a tree of TreeNodes that includes the specified path
// from the root, along with all sibling nodes along the path.
export function convert(
  data: Record<string, Index<BaseRecord>>,
  nodeMapping: NodeMapping,
  roots: string[],
  path: Path,
): TreeNode {
  // Create root node
  const root: TreeNode = {
    id: 0,
    type: 'root',
    name: 'root',
    description: 'root',
    children: {},
  };

  // Populate it with unexpanded root records
  for (const type of roots) {
    const records = data[type];
    root.children[type] = Object.values(records).map(record =>
      recordToTreeNode(type, nodeMapping, record),
    );
  }

  expand(data, nodeMapping, root, path);

  return root;
}

export function expand(
  data: Record<string, Index<BaseRecord>>,
  nodeMapping: NodeMapping,
  parent: TreeNode,
  path: Path,
): void {
  for (let i = 0; i < path.length; i++) {
    const {type, id} = path[i];

    const record = data[type][id];
    const child = parent.children[type].find(node => node.id === id);
    if (!child) {
      throw new Error(`Child not found: ${type} ${id}`);
    }

    // Populate it with unexpanded root records
    for (const [type, ids] of Object.entries(record.children)) {
      child.children[type] = ids.map(id =>
        recordToTreeNode(type, nodeMapping, data[type][id]),
      );
    }
    parent = child;
  }
}

export function recordToTreeNode<TYPE extends string>(
  recordType: TYPE,
  mapping: NodeMapping,
  record: BaseRecord,
): TreeNode {
  return mapping[recordType](record);
}

// Dictionary of functions to convert each type of record to a TreeNode
// for display in the client.
export const nodeMapping: NodeMapping = {
  projects: ({id, name, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Project',
    name,
    description,
    children: {},
  }),
  annotations: ({id, name, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Annotation',
    name,
    description,
    children: {},
  }),
  sessions: ({id, name, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Session',
    name,
    description,
    children: {},
  }),
  suites: ({id, name, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Suite',
    name,
    description,
    children: {},
  }),
  cases: ({id, uuid, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Case',
    name: description,
    description: uuid,
    children: {},
  }),
  runs: ({id, uuid}: Record<string, any>) => ({
    id,
    type: 'Run',
    name: uuid,
    description: `Run ${id}`,
    children: {},
  }),
};
