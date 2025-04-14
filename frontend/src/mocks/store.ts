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
      name: `Project ${id}`,
      description: `Description for Project ${id}`,
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
      name: `Suite ${id}`,
      description: `Description for Suite ${id}`,
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
        expected: {result: `Expected result ${j}`},
      });
    }

    const uuid = crypto.randomUUID();
    const c: Case = {
      id,
      uuid,
      description: `Description for Case ${id}`,
      keywords: [],
      turns,
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
      name: `Annotation ${id}`,
      description: `Description for Annotation ${id}`,
      instructions: `instructions for Annotation ${id}`,
      template: `Template for Annotation ${id}`,
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
      name: `Session ${id}`,
      description: `Description for Session ${id}`,
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
      uuid,
      results: [],
      metadata: {},
      children: {},
    };
    runs[i] = run;
  }

  return {
    projects,
    annotations,
    sessions,
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
