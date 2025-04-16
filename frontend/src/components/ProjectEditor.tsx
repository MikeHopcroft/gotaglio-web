import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useLocation} from 'react-router-dom';

import type {MasterDetailData, PrimaryKey, Project, TreeNode} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

type FormValues = {
  id: PrimaryKey;
  name: string;
  description: string;
};

// Helper function to extract the project ID from the current path
function getProjectIdFromPath(path: string): number | null {
  // Expected path format: /frame/projects/:projectId/ or /frame/projects/:projectId
  const matches = path.match(/\/frame\/projects\/(\d+)/);
  if (matches && matches[1]) {
    return parseInt(matches[1], 10);
  }
  return null;
}

// Helper function to find a node in the tree
function findNodeInTree(tree: TreeNode, type: string, id: number): boolean {
  // Check if this is the node we're looking for
  if (tree.type === type && tree.id === id) {
    return true;
  }

  // Check children
  for (const [childType, children] of Object.entries(tree.children)) {
    for (const child of children) {
      if (findNodeInTree(child, type, id)) {
        return true;
      }
    }
  }

  return false;
}

function ProjectEditor() {
  const {data, isLoading, error, update, routePath} = useRouteData();
  const location = useLocation();

  const methods = useForm<FormValues>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const {control, handleSubmit, reset, watch} = methods;

  // Load data from useRouteData
  useEffect(() => {
    console.log('ProjectEditor: useEffect triggered');
    console.log(`ProjectEditor: data: ${JSON.stringify(data, null, 2)}`);
    console.log(`ProjectEditor: routePath: ${routePath}`);
    console.log(`ProjectEditor: location.pathname: ${location.pathname}`);
    
    // Skip if data is not available yet
    if (!data || !data.detail) {
      console.log('ProjectEditor: No data available, skipping form reset');
      return;
    }

    // Check if we're viewing a project
    if (data.type !== 'projects') {
      console.log(`ProjectEditor: Not a project (type: ${data.type}), skipping form reset`);
      return;
    }

    // Verify that the current path matches the project in data.detail
    const projectId = getProjectIdFromPath(location.pathname);
    if (projectId === null) {
      console.log('ProjectEditor: Could not extract project ID from path');
      return;
    }

    if (data.detail.id !== projectId) {
      console.log(`ProjectEditor: Project ID mismatch: path=${projectId}, data=${data.detail.id}`);
      return;
    }

    // Verify the project exists in the tree
    if (!findNodeInTree(data.tree, 'projects', projectId)) {
      console.log(`ProjectEditor: Project ID ${projectId} not found in tree`);
      return;
    }

    // Path and data are consistent, proceed with form reset
    try {
      const project = data.detail as Project;
      const {id, name, description} = project;
      
      console.log(`ProjectEditor: Resetting form with project data: ${JSON.stringify({id, name, description}, null, 2)}`);
      
      // Use setTimeout to ensure this happens in the next event loop tick
      // This helps avoid race conditions with React's rendering
      setTimeout(() => {
        reset({id, name, description});
      }, 0);
    } catch (err) {
      console.error('ProjectEditor: Error setting form data:', err);
    }
  }, [data, reset, location.pathname, routePath]);

  const onSubmit = (detail: FormValues) => {
    if (data) {
      const updatedData = {
        ...data.detail,
        ...detail
      };
      update(data?.type, updatedData);
    } else {
      console.error('No data available to update');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data || !data.detail) {
    return <div>No data available</div>;
  } else if (data.type !== 'projects') {
    return <div>Invalid data type: expected 'projects', got '{data.type}'</div>;
  } else {
    return (
      <>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 max-w-xl mx-auto space-y-4"
          >
            <label className="text-xs text-gray-500 mt-1 block m-0">
              Name
            </label>
            <div className="flex space-x-2 items-start">
              <div className="flex-1">
                <textarea
                  className="border px-2 py-1 rounded w-full m-0"
                  {...control.register('name')}
                  placeholder="Name"
                  rows={3}
                />
              </div>
            </div>

            <label className="text-xs text-gray-500 mt-1 block m-0">
              Description
            </label>
            <div className="flex space-x-2 items-start">
              <div className="flex-1">
                <textarea
                  className="border px-2 py-1 rounded w-full m-0"
                  {...control.register('description')}
                  placeholder="Description"
                  rows={3}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </form>
        </FormProvider>
      </>
    );
  }
}

export default ProjectEditor;