/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AnyRecord,
  BaseRecord,
  IService,
  MasterDetailData,
  PrimaryKey,
  TreeNode,
} from '../dataModel';

import {buildIndexes, Index} from './store';

export class MockService implements IService {
  data: Record<string, Index<AnyRecord>>;

  constructor() {
    this.data = buildIndexes() as unknown as Record<string, Index<AnyRecord>>;
  }

  getData(pathName: string): Promise<MasterDetailData> {
    const path = pathsFromRoute(pathName);
    const tree = convert(this.data, fieldMapping, ['projects'], path);
    const {type, id} = path[path.length - 1];
    const detail = this.data[type][id];

    return Promise.resolve({tree, type, detail});
  }

  update(path: string, type: string, record: AnyRecord): Promise<MasterDetailData> {
    const records = this.data[type];
    if (records) {
      if (!(record.id in records)) {
        throw new Error(`Record not found: ${type} ${record.id}`);
      }
      records[record.id] = record;
    } else {
      throw new Error(`Type not found: ${type}`);
    }
    return this.getData(path);
  }
}

type PathStep = {type: string; id: PrimaryKey};
type Path = PathStep[];

function pathsFromRoute(route: string): Path {
  const segments = route.split('/').filter(Boolean);
  segments.shift(); // remove the first segment
  const path: Path = [];
  while (segments.length) {
    const type = segments.shift()!;
    const id = (segments.length ? Number(segments.shift()) : undefined)!;
    path.push({type, id});
  }
  return path;
}

type FieldMapping = Record<string, Record<string, string>>;

// Creates a tree of TreeNodes that includes the specified path
// from the root, along with all sibling nodes along the path.
export function convert(
  data: Record<string, Index<AnyRecord>>,
  nodeMapping: FieldMapping,
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
  data: Record<string, Index<AnyRecord>>,
  fieldMapping: FieldMapping,
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
        recordToTreeNode(type, fieldMapping, data[type][id]),
      );
    }
    parent = child;
  }
}

export function recordToTreeNode<TYPE extends string>(
  type: TYPE,
  mapping: FieldMapping,
  record: BaseRecord,
): TreeNode {
  const node: Record<string, any> = {id: record.id, type, children: {}};
  for (const field in mapping[type]) {
    const key = fieldMapping[type][field];
    if (key in record) {
      node[field] = String((record as Record<string, any>)[key]);
    } else {
      throw new Error(`Field not found: ${type} ${key}`);
    }
  }
  return node as TreeNode;
}

export const fieldMapping: FieldMapping = {
  projects: {name: 'name', description: 'description'},
  annotations: {name: 'name', description: 'description'},
  sessions: {name: 'name', description: 'description'},
  suites: {name: 'name', description: 'description'},
  cases: {name: 'description', description: 'uuid'},
  runs: {name: 'uuid', description: 'id'},
};
