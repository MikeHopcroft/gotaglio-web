import {PrimaryKey} from './dataModel';

///////////////////////////////////////////////////////////////////////////////
//
// Tree view
//
///////////////////////////////////////////////////////////////////////////////
export type PathStep = {type: string; id: PrimaryKey};
export type Path = PathStep[];

// import {TreeNode} from './dataModel';

// export async function loadData(pathname: string): Promise<{tree: TreeNode}> {
//   // This is a placeholder. Replace with your actual implementation
//   console.log(`backend.tsx: Loading data for pathname: ${pathname}`);

//   // Simulate API call
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Simulate success or failure based on path


//       if (pathname.includes('error')) {
//         reject(new Error(`apps.tsx: Failed to load data for ${pathname}`));
//       } else {
//         console.log('apps.tsx: about to resolve', pathname);
//         resolve({tree});
//       }
//     }, 1000);
//   });
// }
