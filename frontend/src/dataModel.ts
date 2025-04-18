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
export type EmptyObject = Record<string, never>;

export type Serializable =
  | string
  | number
  | boolean
  | Serializable[]
  | { [key: string]: Serializable };

export type SerializableRecord = Record<string, Serializable>;

export type FormFields = Record<string, any>;
export interface BaseRecord<
  FIELDS extends Record<string, any>,
  CHILDREN extends Record<string, PrimaryKey[]>,
> {
  id: PrimaryKey;
  children: CHILDREN;
  fields: FIELDS;
}

export type AnyRecord = Project | Suite | Case | Annotation | Session | RunLog;

export type Project = BaseRecord<
  {name: string; description: string},
  {
    suites: PrimaryKey[];
    annotations: PrimaryKey[];
    runs: PrimaryKey[];
  }
>;

export type Suite = BaseRecord<
  {name: string; description: string},
  {cases: PrimaryKey[]}
>;

export type Case = BaseRecord<
  {uuid: string; keywords: string[]; description: string; turns: Turn[]},
  Record<string, PrimaryKey[]>
>;

export type Annotation = BaseRecord<
  {name: string; description: string; instructions: string; template: string},
  {sessions: PrimaryKey[]}
>;

export type Session = BaseRecord<
  {name: string; description: string},
  EmptyObject
>;

export type RunLog = BaseRecord<
  {uuid: string; results: Result[]; metadata: Record<string, any>},
  EmptyObject
>;

export interface Turn {
  query: string;
  expected: Record<string, any>;
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
