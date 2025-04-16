/* eslint-disable @typescript-eslint/no-explicit-any */
///////////////////////////////////////////////////////////////////////////////
//
// Data model typse
//
// Project, Suite, Case, and RunLog correspond to schemas for database
// tables.
//
///////////////////////////////////////////////////////////////////////////////
export type PrimaryKey = number;

export type FormFields = Record<string, any>;
export interface BaseRecord {
  id: PrimaryKey;
  children: Record<string, PrimaryKey[]>;
}

export type AnyRecord = Project | Suite | Case | Annotation | Session | RunLog;

// Consider making generic record/form editor work on a `fields`
// property that contains all of the fields not in BaseRecord.
// This way form update can't change id or children.
// For example,
//
// export interface Project extends BaseRecord {
//   fields: {
//     name: string;
//     description: string;
//   };
//   children: {
//     suites: PrimaryKey[];
//     annotations: PrimaryKey[];
//     runs: PrimaryKey[];
//   };
// }
export interface Project extends BaseRecord {
  name: string;
  description: string;
  children: {
    suites: PrimaryKey[];
    annotations: PrimaryKey[];
    runs: PrimaryKey[];
  };
}

export interface Suite extends BaseRecord {
  name: string;
  description: string;
  children: {cases: PrimaryKey[]};
}

export interface Case extends BaseRecord {
  uuid: string;
  keywords: string[];
  description: string;
  turns: Turn[];
  children: Record<string, PrimaryKey[]>;
}

export interface Turn {
  query: string;
  expected: Record<string, any>;
}

export interface Annotation extends BaseRecord {
  name: string;
  description: string;
  instructions: string;
  template: string;
  children: {sessions: PrimaryKey[]};
}

export interface Session extends BaseRecord {
  name: string;
  description: string;
}

export interface RunLog extends BaseRecord {
  uuid: string;
  results: Result[];
  metadata: Record<string, any>;
}

export interface Result {
  suceeded: boolean;
  metadata: Record<string, any>;
  case: Case;
  stages: Record<string, any>;
}

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

export type MasterDetailData = {
  tree: TreeNode;
  type: string;
  detail: AnyRecord;
  path: string; // The path used to create this data
};

export interface IService {
  getData(path: string): Promise<MasterDetailData>;
  update(
    path: string,
    type: string,
    record: AnyRecord,
  ): Promise<MasterDetailData>;
}
