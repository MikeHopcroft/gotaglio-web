import seedrandom from 'seedrandom';
const seed = '1234';
const rnd = seedrandom(seed); // Initialize the random generator

import type {
  Annotation,
  Case,
  PrimaryKey,
  Project,
  RunLog,
  Session,
  Suite,
  Turn,
} from '../dataModel';

///////////////////////////////////////////////////////////////////////////////
//
// Mock DataStore and data
//
///////////////////////////////////////////////////////////////////////////////
export type Index<T> = Record<PrimaryKey, T>;

export interface DataStore {
  projects: Index<Project>;
  suites: Index<Suite>;
  cases: Index<Case>;
  annotations: Index<Annotation>;
  sessions: Index<Session>;
  runs: Index<RunLog>;
}

// Creates a DataStore, populated with random projects,
// annotations, sessions, suites, cases, and runs.
export function buildIndexes(): DataStore {
  const projectIds = new IdAllocator();
  const suiteIds = new IdAllocator();
  const caseIds = new IdAllocator();
  const annotationIds = new IdAllocator();
  const sessionIds = new IdAllocator();
  const runIds = new IdAllocator();

  //
  // Create projects
  //
  const projects: Index<Project> = {};
  for (let i = 1; i <= getRandomInt(5) + 2; i++) {
    const suites: PrimaryKey[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      suites.push(suiteIds.getNextId());
    }

    const annotations: PrimaryKey[] = [];
    for (let j = 1; j <= getRandomInt(3); j++) {
      annotations.push(annotationIds.getNextId());
    }

    const runs: PrimaryKey[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      runs.push(runIds.getNextId());
    }

    const id = projectIds.getNextId();
    const project: Project = {
      id,
      fields: {
        name: `Project ${id}`,
        description: `Description for Project ${id}`,
      },
      children: {suites, annotations, runs},
    };
    projects[i] = project;
  }

  //
  // Create suites
  //
  const suites: Index<Suite> = {};
  for (let id = 1; id <= suiteIds.getLastId(); id++) {
    const cases: PrimaryKey[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      cases.push(caseIds.getNextId());
    }

    const suite: Suite = {
      id,
      fields: {name: `Suite ${id}`, description: `Description for Suite ${id}`},
      children: {cases},
    };
    suites[id] = suite;
  }

  //
  // Create cases
  //
  const cases: Index<Case> = {};
  for (let id = 1; id <= caseIds.getLastId(); id++) {
    const turns: Turn[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      turns.push({
        query: `Query ${j}`,
        expected: {},
      });
    }

    const uuid = crypto.randomUUID();
    const c: Case = {
      id,
      fields: {
        uuid,
        description: `Description for Case ${id}`,
        keywords: [],
        turns,
      },
      children: {},
    };
    cases[id] = c;
  }

  //
  // Create annoations
  //
  const annotations: Index<Annotation> = {};
  for (let id = 1; id <= annotationIds.getLastId(); id++) {
    const sessions: PrimaryKey[] = [];
    for (let j = 1; j <= getRandomInt(5); j++) {
      sessions.push(sessionIds.getNextId());
    }

    const annotation: Annotation = {
      id,
      fields: {
        name: `Annotation ${id}`,
        description: `Description for Annotation ${id}`,
        instructions: `instructions for Annotation ${id}`,
        template: `Template for Annotation ${id}`,
      },
      children: {sessions},
    };

    annotations[id] = annotation;
  }

  //
  // Create sessions
  //
  const sessions: Index<Session> = {};
  for (let id = 1; id <= sessionIds.getLastId(); id++) {
    const session: Session = {
      id,
      fields: {
        name: `Session ${id}`,
        description: `Description for Session ${id}`,
      },
      children: {},
    };

    sessions[id] = session;
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
      fields: {
        uuid,
        results: [],
        metadata: {},
      },
      children: {},
    };
    runs[i] = run;
  }

  const dataStore = {
    projects,
    annotations,
    sessions,
    suites,
    cases,
    runs,
  };

  applyPatches(dataStore, patches);

  return dataStore;
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


type Serializable =
  | string
  | number
  | boolean
  | Serializable[]
  | { [key: string]: Serializable };

type SerializableRecord = Record<string, Serializable>;

type Patch = {type: (keyof DataStore) & string, id: PrimaryKey, fields: SerializableRecord}

const patches: Patch[] = [
  {
    type: 'projects',
    id: 1,
    fields: {
      name: 'Fast food ordering',
    }
  },
  {
    type: 'projects',
    id: 2,
    fields: {
      name: 'Case augmentation',
    }
  },
  {
    type: 'suites',
    id: 1,
    fields: {
      name: 'Basic ordering',
    }
  },
  {
    type: 'suites',
    id: 2,
    fields: {
      name: 'Complex orders',
    }
  },
  {
    type: 'suites',
    id: 3,
    fields: {
      name: 'Problematic', 
      description: 'These are broken cases found in the wild. They are under investigation.',
      keywords: ['problematic'],
    }
  },
  {
    type: 'cases',
    id: 1,
    fields: {
      description: 'Simple burger order',
      turns: [
        {
          query: "can I a double wiseguy with no tomatoes and extra mayo",
          expected: {
            "items": [
              {
                "name": "Double Wiseguy",
                "type": "CHOOSE",
                "options": [
                  {
                    "amount": "No",
                    "name": "Tomato"
                  },
                  {
                    "amount": "Extra",
                    "name": "Mayo"
                  }
                ]
              }
            ]
          },
        }
      ]
    }
  },
  {
    type: 'cases',
    id: 2,
    fields: {
      description: 'Multistep burger order',
      keywords: ['multistep'],
      turns: [
        {
          query: "can I a double wiseguy with no tomatoes and extra mayo",
          expected: {
            "items": [
              {
                "name": "Double Wiseguy",
                "type": "CHOOSE",
                "options": [
                  {
                    "amount": "No",
                    "name": "Tomato"
                  },
                  {
                    "amount": "Extra",
                    "name": "Mayo"
                  }
                ]
              }
            ]
          },
        },
        {
          "query": "make that with cheese and bacon",
          "expected": {
            "items": [
              {
                "name": "Double Wiseguy",
                "type": "With Bacon and Cheese",
                "options": [
                  {
                    "amount": "No",
                    "name": "Tomato"
                  },
                  {
                    "amount": "Extra",
                    "name": "Mayo"
                  }
                ]
              }
            ]
          }
        }
  
      ]
    }
  }

];

// export function buildPatchedIndexes(): DataStore {
//   const store = buildIndexes();
//   applyPatches(store, patches);
//   return store;
// }

function applyPatches(store: DataStore, patches: Patch[]) {
  for (const patch of patches) {
    const {type, id, fields} = patch;
    if (!(type in store)) {
      throw new Error(`Unknown type: ${type}`);
    }
    const index = store[type];
    if (!(id in index)) {
      throw new Error(`Unknown id: ${type}(${id})`);
    }
      const record = index[id];
      record.fields = {...record.fields, ...fields};
  }
}
