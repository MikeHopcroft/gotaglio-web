/* eslint-disable @typescript-eslint/no-explicit-any */
import * as seedrandom from 'seedrandom';
const seed = '1234';
const rnd = seedrandom(seed); // Initialize the random generator

///////////////////////////////////////////////////////////////////////////////
//
// Data model typse
//
// Project, Suite, Case, and RunLog correspond to schemas for database
// tables.
//
///////////////////////////////////////////////////////////////////////////////
type PrimaryKey = number;

interface BaseRecord {
  id: PrimaryKey;
  children: Record<string, PrimaryKey[]>;
}

interface Project extends BaseRecord {
  name: string;
  description: string;
  children: {suites: PrimaryKey[]; runs: PrimaryKey[]};
}

interface Suite extends BaseRecord {
  name: string;
  description: string;
  children: {cases: PrimaryKey[]};
}

interface Case extends BaseRecord {
  uuid: string;
  keywords: string[];
  description: string;
  turns: Turn[];
  children: Record<string, PrimaryKey[]>;
}

interface Turn {
  query: string;
  expected: Record<string, any>;
}

interface RunLog extends BaseRecord {
  uuid: string;
  results: Result[];
  metadata: Record<string, any>;
}

interface Result {
  suceeded: boolean;
  metadata: Record<string, any>;
  case: Case;
  stages: Record<string, any>;
}

///////////////////////////////////////////////////////////////////////////////
//
// Mock DataStore and data
//
///////////////////////////////////////////////////////////////////////////////
type Index<T> = Record<PrimaryKey, T>;

interface DataStore {
  projects: Index<Project>;
  suites: Index<Suite>;
  cases: Index<Case>;
  runs: Index<RunLog>;
}

// Creates a DataStore, populated with random projects, suites, cases,
// and runs.
function buildIndexes(): DataStore {
  const projectIds = new IdAllocator();
  const suiteIds = new IdAllocator();
  const caseIds = new IdAllocator();
  const runIds = new IdAllocator();

  //
  // Create projects
  //
  const projects: Index<Project> = {};
  for (let i = 1; i <= getRandomInt(5) + 2; i++) {
    const suites: number[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      suites.push(suiteIds.getNextId());
    }

    const runs: number[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      runs.push(runIds.getNextId());
    }

    const id = projectIds.getNextId();
    const project: Project = {
      id,
      name: `Project ${id}`,
      description: `Description for Project ${id}`,
      children: {suites, runs},
    };
    projects[i] = project;
  }

  //
  // Create suites
  //
  const suites: Index<Suite> = {};
  for (let i = 1; i <= suiteIds.getLastId(); i++) {
    const cases: number[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      cases.push(caseIds.getNextId());
    }

    const id = i;
    const suite: Suite = {
      id,
      name: `Suite ${id}`,
      description: `Description for Suite ${id}`,
      children: {cases},
    };
    suites[i] = suite;
  }

  //
  // Create cases
  //
  const cases: Index<Case> = {};
  for (let i = 1; i <= caseIds.getLastId(); i++) {
    const turns: Turn[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      turns.push({
        query: `Query ${j}`,
        expected: {result: `Expected result ${j}`},
      });
    }

    const id = i;
    const uuid = crypto.randomUUID();
    const c: Case = {
      id,
      uuid,
      description: `Description for Case ${id}`,
      keywords: [],
      turns,
      children: {},
    };
    cases[i] = c;
  }

  //
  // Create runs
  //
  const runs: Index<RunLog> = {};
  for (let i = 1; i <= runIds.getLastId(); i++) {
    const id = i;
    const uuid = crypto.randomUUID();
    const run: RunLog = {
      id,
      uuid,
      results: [],
      metadata: {},
      children: {},
    };
    runs[i] = run;
  }

  return {
    projects,
    suites,
    cases,
    runs,
  };
}

class IdAllocator {
  private currentId = 0;

  getNextId(): number {
    return ++this.currentId;
  }

  getLastId(): number {
    return this.currentId;
  }
}

function getRandomInt(n: number): number {
  return Math.floor(rnd() * n) + 1;
}

// Dictionary of functions to convert each type of record to a TreeNode
// for display in the client.
const nodeMapping: NodeMapping = {
  projects: ({id, name, description}: Record<string, any>): TreeNode => ({
    id,
    type: 'Project',
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
  runs: ({id, uuid}) => ({
    id,
    type: 'Run',
    name: uuid,
    description: `Run ${id}`,
    children: {},
  }),
};

///////////////////////////////////////////////////////////////////////////////
//
// Tree view
//
///////////////////////////////////////////////////////////////////////////////
export interface TreeNode {
  id: PrimaryKey;
  type: string;
  name: string; // Display name of item
  description: string; // Toolip
  children: Record<string, TreeNode[]>;
}

type NodeMapping = Record<string, (r: Record<string, any>) => TreeNode>;

function recordToTreeNode<TYPE extends string>(
  recordType: TYPE,
  mapping: NodeMapping,
  record: BaseRecord,
): TreeNode {
  return mapping[recordType](record);
}

type PathStep = {type: string; id: PrimaryKey};
type Path = PathStep[];

// Creates a tree of TreeNodes that includes the specified path
// from the root, along with all sibling nodes along the path.
function convert(
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

function expand(
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


///////////////////////////////////////////////////////////////////////////////
//
// Sample usage
//
///////////////////////////////////////////////////////////////////////////////
function go() {
  const dataStore = buildIndexes();
  console.log(JSON.stringify(dataStore, null, 2));

  console.log('\n\n\n\n');
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log('\n\n\n\n');

  const expanded = convert(
    dataStore as unknown as Record<string, Index<BaseRecord>>,
    nodeMapping,
    ['projects'],
    [{type: 'projects', id: 2}, {type: 'suites', id: 6}],
  );
  console.log(JSON.stringify(expanded, null, 2));
}

go();
