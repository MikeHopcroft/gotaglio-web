/* eslint-disable @typescript-eslint/no-explicit-any */
// import {suite} from './sample-data';

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
namespace foo {
  type PrimaryKey = number;

  // interface Root {
  //   projects: string[];
  // }

  interface Project {
    id: PrimaryKey;
    name: string;
    description: string;
    suites: PrimaryKey[];
    runs: PrimaryKey[];
  }

  interface Suite {
    id: PrimaryKey;
    name: string;
    description: string;
    cases: PrimaryKey[];
  }

  interface Case {
    id: PrimaryKey;
    uuid: string;
    keywords: string[];
    description?: string;
    turns: Turn[];
  }

  interface Turn {
    query: string;
    expected: Record<string, any>;
  }

  interface RunLog {
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

  type Index<T> = Record<number, T>;

  interface DataStore {
    projects: Index<Project>;
    suites: Index<Suite>;
    cases: Index<Case>;
    runs: Index<RunLog>;
  }

  function buildIndexes(): DataStore {
    const projectIds = new IdAllocator();
    const suiteIds = new IdAllocator();
    const caseIds = new IdAllocator();
    const runIds = new IdAllocator();

    //
    // Create projects
    //
    const projects: Index<Project> = {};
    for (let i = 1; i <= getRandomInt(5); i++) {
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
        suites,
        runs,
      };
      projects[i] = project;
    }

    //
    // Create suites
    //
    const suites: Index<Suite> = {};
    for (let i = 1; i <= getRandomInt(5); i++) {
      const cases: number[] = [];
      for (let j = 1; j <= getRandomInt(5); j++) {
        cases.push(caseIds.getNextId());
      }

      const id = suiteIds.getNextId();
      const suite: Suite = {
        id,
        name: `Suite ${id}`,
        description: `Description for Suite ${id}`,
        cases,
      };
      suites[i] = suite;
    }

    //
    // Create cases
    //
    const cases: Index<Case> = {};
    for (let i = 1; i <= getRandomInt(5); i++) {
      const turns: Turn[] = [];
      for (let j = 1; j <= getRandomInt(5); j++) {
        turns.push({
          query: `Query ${j}`,
          expected: {result: `Expected result ${j}`},
        });
      }

      const id = caseIds.getNextId();
      const uuid = crypto.randomUUID();
      const c: Case = {
        id,
        uuid,
        description: `Description for Case ${id}`,
        keywords: [],
        turns,
      };
      cases[i] = c;
    }

    //
    // Create runs
    //
    const runs: Index<RunLog> = {};
    for (let i = 1; i <= getRandomInt(5); i++) {
      const uuid = crypto.randomUUID();
      const run: RunLog = {
        uuid,
        results: [],
        metadata: {},
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
  }

  function getRandomInt(n: number): number {
    return Math.floor(Math.random() * n) + 1;
  }

  // projects - list of projects on left, blank detail
  // projects/1 - list with 1 selected, detail for 1
  // projects/1/suites - same as above with suites expanded
  // projects/1/suites/2 - same as above with 2 selected, detail for 2
  // projects/1/suites/2/cases
  // projects/1/suites/2/cases/3
  // projects/1/runs
  // projects/1/runs/4

  // interface TreeNode {
  //   type: string;
  //   id: number;
  //   name: string;
  //   description: string;
  //   children: Record<string, TreeNode[]>;
  // }

  // function makeNode(x: any): TreeNode {
  //   throw 0;
  // }

  // function treeForPath(store: DataStore, path: string) {
  //   const parts = path.split('.').map(part => part.trim());
  //   // if (parts.length === 0) {
  //   //   parts.push('projects');
  //   // }

  //   const root: TreeNode = {
  //     type: 'root',
  //     id: 0,
  //     name: 'root',
  //     description: 'root',
  //     children: {projects: Object.values(store['projects']).map(x => makeNode(x))},
  //   }

  //   treeForPathRecursion(store, parts, root);

  //   return root;
  //   // const parent = 'projects';
  //   // const siblings = Object.values(store[parent]).map(p => p.name);
  //   // while (parts.length >= 2) {
  //   //   const part = parts.shift();
  //   //   if (!part || !(part in store)) {
  //   //     throw new Error(`Invalid path: '${part}' is not a key of the store`);
  //   //   }

  //   //   console.log(part);
  //   // }
  // }

  // function makeChildren(parent: TreeNode, path: {type: string, id: number}[]) {
  //   // Look up underlying object from dataStore, using parent.type and parent.id.
  //   // Use schema to get list of child fields.
  //   // For each child field.
  //   //    Make node and add to children.
  //   //    If node matches child type and id, recurse.

  // }

  // function treeForPathRecursion(
  //   store: DataStore,
  //   parts: string[],
  //   parent: TreeNode,
  // ) {
  //   if (parts.length == 0) {
  //     return
  //   } else if (parts.length >= 2) {
  //     const type = parts.shift();
  //     const id = parts.shift();
  //     const nodes = parent.children[type];
  //     if (!nodes) {
  //       throw new Error(`Invalid path: '${type}' is not a child of the ${parent.type}.`);
  //     }
  //     for (const node of nodes) {
  //       if (node.id === id) {
  //         treeForPathRecursion(store, parts, node);
  //       }
  //     }
  //     throw new Error(`Invalid path: '${id}' is not a child of '${type}'`);
  //   } else {
  //     throw new Error(`Invalid path: '${parts.join('.')}'`);
  //   }
  // }

  // function treeForPathRecursion2(
  //   store: DataStore,
  //   parts: string[],
  //   schema: Record<string, string[]>,
  //   parent: string,
  //   siblings: Record<string, any>,
  // ) {
  //   if (parts.length === 0) {
  //     return siblings
  //   } else if (parts.length >= 2) {
  //     const child = parts.shift();
  //     if (!child || !(child in store)) {
  //       throw new Error(`Invalid path: '${child}' is not a key of the store`);
  //     }
  //     if (!isLegal(parent, child)) {
  //       throw new Error(`Invalid path: '${child}' is not a child of '${parent}'`);
  //     }
  //     const id = parts.shift();
  //     for (const s of siblings) {
  //       if (s.id === id) {
  //         treeForPathRecursion(store, parts, schema, child, s);
  //       }
  //     }
  //   }

  function go() {
    const dataStore = buildIndexes();
    console.log(JSON.stringify(dataStore, null, 2));
  }

  go();

  // interface IBackend {
  //   getProject(id: string): Promise<Project>;
  //   upsertProject(suite: Suite): Promise<Project>;
  //   removeProject(id: string): Promise<void>;

  //   getSuite(id: string): Promise<Suite>;
  //   upsertSuite(suite: Suite): Promise<Suite>;
  //   removeSuite(id: string): Promise<void>;

  //   getCase(id: string): Promise<Case>;
  //   upsertCase(caseData: Case): Promise<Case>;
  //   removeCase(id: string): Promise<void>;
  // }

  // export class MockBackend implements IBackend {
  //   uuidToCase: Map<string, Case>;

  //   constructor() {
  //     const cases: Case[] = suite.cases;
  //     this.uuidToCase = new Map<string, Case>(cases.map(c => [c.uuid, c]));
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   async upsertSuite(suite: Suite): Promise<Suite> {
  //     throw new Error('Method not implemented.');
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   async removeSuite(id: string): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   upsertCase(caseData: Case): Promise<Case> {
  //     throw new Error('Method not implemented.');
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   removeCase(id: string): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }

  //   // Simulate fetching a suite by ID
  //   async getSuite(id: string): Promise<Suite> {
  //     console.log(`Fetching suite with ID: ${id}`);
  //     // Return a mock suite object
  //     const s = {
  //       uuid: suite.uuid,
  //       name: suite.name,
  //       description: suite.description,
  //       cases: suite.cases.map(c => c.uuid),
  //     };
  //     return new Promise(resolve => {
  //       setTimeout(() => resolve(s), 1000);
  //     });
  //   }

  //   // Simulate fetching a case by ID
  //   async getCase(id: string): Promise<Case> {
  //     console.log(`Fetching case with ID: ${id}`);
  //     // Return a mock case object
  //     const c = this.uuidToCase.get(id);
  //     if (!c) {
  //       throw new Error(`Case with ID ${id} not found`);
  //     }
  //     return new Promise(resolve => {
  //       setTimeout(() => resolve(c), 1000);
  //     });
  //   }
  // }
}
