import {PrimaryKey, TreeNode} from './dataModel';


///////////////////////////////////////////////////////////////////////////////
//
// Tree view
//
///////////////////////////////////////////////////////////////////////////////
export type PathStep = {type: string; id: PrimaryKey};
export type Path = PathStep[];


const nodeTypeToPath = {
  root: '/frame', // TODO: is this needed?
  Project: 'projects',
  Annotation: 'annotations',
  Session: 'sessions',
  Suite: 'suites',
  Case: 'cases',
  Run: 'runs',
};

export function routeBuilder(path: string, node: TreeNode): string {
  const nodeType = node.type;
  if (nodeType === 'root') {
    return '/frame/';
  }
  if (nodeType in nodeTypeToPath) {
    const type = nodeTypeToPath[nodeType as keyof typeof nodeTypeToPath];
    return `${path}${type}/${node.id}/`;
  }
  throw new Error(`Unknown node type: ${node.type}`);
}

