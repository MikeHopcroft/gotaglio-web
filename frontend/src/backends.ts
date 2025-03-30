import {suite} from './sample-data';

interface Suite {
  uuid: string;
  name: string;
  description?: string;
  cases: string[];
}

interface Case {
  uuid: string;
  description?: string;
  turns: Turn[];
}

interface Turn {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expected: Record<string, any>;
}

interface IBackend {
  getSuite(id: string): Promise<Suite>;
  upsertSuite(suite: Suite): Promise<Suite>;
  removeSuite(id: string): Promise<void>;

  getCase(id: string): Promise<Case>;
  upsertCase(caseData: Case): Promise<Case>;
  removeCase(id: string): Promise<void>;
}

export class MockBackend implements IBackend {
  uuidToCase: Map<string, Case>;

  constructor() {
    const cases: Case[] = suite.cases;
    this.uuidToCase = new Map<string, Case>(cases.map(c => [c.uuid, c]));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async upsertSuite(suite: Suite): Promise<Suite> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeSuite(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  upsertCase(caseData: Case): Promise<Case> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCase(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  // Simulate fetching a suite by ID
  async getSuite(id: string): Promise<Suite> {
    console.log(`Fetching suite with ID: ${id}`);
    // Return a mock suite object
    const s = {
      uuid: suite.uuid,
      name: suite.name,
      description: suite.description,
      cases: suite.cases.map(c => c.uuid),
    };
    return new Promise(resolve => {
      setTimeout(() => resolve(s), 1000);
    });
  }

  // Simulate fetching a case by ID
  async getCase(id: string): Promise<Case> {
    console.log(`Fetching case with ID: ${id}`);
    // Return a mock case object
    const c = this.uuidToCase.get(id);
    if (!c) {
      throw new Error(`Case with ID ${id} not found`);
    }
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve(c),
        1000,
      );
    });
  }
}
