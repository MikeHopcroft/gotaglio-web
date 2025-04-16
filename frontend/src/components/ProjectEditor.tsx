import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useLocation} from 'react-router-dom';

import type {PrimaryKey, Project} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

type FormValues = {
  id: PrimaryKey;
  name: string;
  description: string;
};

function ProjectEditor() {
  const {data, isLoading, error, update} = useRouteData();
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

    // Verify that the current path matches the data path
    if (data.path !== location.pathname) {
      console.log(`ProjectEditor: Path mismatch: current=${location.pathname}, data=${data.path}`);
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
  }, [data, reset, location.pathname]);

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
  } else if (data.path !== location.pathname) {
    return <div>Path mismatch: expected '{location.pathname}', got '{data.path}'</div>;
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
