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

    // Include the path in the returned data
    return Promise.resolve({tree, type, detail, path: pathName});
  }

  update(
    path: string,
    type: string,
    record: AnyRecord,
  ): Promise<MasterDetailData> {
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
    if (!records) {
      console.error(`No records found for type: ${type}`);
      continue;
    }

    const recordValues = Object.values(records);
    console.log(`Processing ${recordValues.length} records for type: ${type}`);

    root.children[type] = recordValues.map(record => {
      try {
        return recordToTreeNode(
          type,
          nodeMapping,
          record as BaseRecord<any, any>,
        );
      } catch (error) {
        console.error(`Error processing record:`, record, error);
        throw error;
      }
    });
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

    // Ensure `record` is properly typed as `BaseRecord` at its source
    const record: BaseRecord<any, Record<string, PrimaryKey[]>> = data[type][id];

    if (id == undefined) {
      return;
    }
    const child = parent.children[type].find(node => node.id === id);
    if (!child) {
      throw new Error(`Child not found: ${type} ${id}`);
    }

    // Populate it with unexpanded root records
    for (const [type, ids] of Object.entries(record.children)) {
      try {
        child.children[type] = ids.map(id =>
          recordToTreeNode(
            type,
            fieldMapping,
            data[type][id] as BaseRecord<any, Record<string, PrimaryKey[]>>,
          ),
        );
      } catch (err) {
        console.error(`Error expanding children for type: ${type}`, err);
        throw err;
      }
    }
    parent = child;
  }
}

export function recordToTreeNode<
  TYPE extends string,
  FIELDS extends Record<string, any>,
  CHILDREN extends Record<string, PrimaryKey[]>,
>(
  type: TYPE,
  mapping: FieldMapping,
  record: BaseRecord<FIELDS, CHILDREN>,
): TreeNode {
  const node: Record<string, any> = {
    id: record.id,
    type,
    children: {},
  };
  const fields = record.fields;
  for (const field in mapping[type]) {
    const key = fieldMapping[type][field];
    if (key in fields) {
      node[field] = String(fields[key]);
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
  runs: {name: 'uuid', description: 'uuid'},
};
