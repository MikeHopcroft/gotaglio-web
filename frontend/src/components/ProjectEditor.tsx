import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';

import type {MasterDetailData, PrimaryKey, Project} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

type FormValues = {
  id: PrimaryKey;
  name: string;
  description: string;
};

function ProjectEditor() {
  const {data, isLoading, error, update} = useRouteData();

  const methods = useForm<FormValues>({
    defaultValues: {
      id: 0,
      name: '',
      description: '',
    },
  });
  const {control, handleSubmit, reset, watch} = methods;
  // const isInitialLoad = useRef(true);

  // Load data from useRouteData
  useEffect(() => {
    console.log('ProjectEditor: useEffect triggered');
    console.log(`ProjectEditor: data: ${JSON.stringify(data, null, 2)}`);
    // TODO: REVIEW
    // Originally, the code was
    if (data !== null) {
    // Added data.detail !== null to avoid error
    // Repro: 
    //   1. Navigate to http://localhost:5173/frame/projects/1/
    //   2. Click on `suites` (or any red, grouping node)
    //   3. Click on `Project 1`
    // if (data !== null && data.detail !== undefined) {
      const {id, name, description} = data.detail as Project;
      reset({id, name, description});
    }
  }, [data, reset]);

  const onSubmit = (detail: FormValues) => {
    if (data) {
      const updatedData = {
        ...data.detail,
        ...detail
        // id: detail.id,
        // name: detail.name,
        // description: detail.description,
      };
      update(data?.type, updatedData);
      // update(data?.type, detail as Project);
    } else {
      console.error('No data available to update');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    // const {detail, type} = data as MasterDetailData;

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
