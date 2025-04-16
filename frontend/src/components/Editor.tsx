import React, {useEffect, JSX} from 'react';
import {Control, useForm, FormProvider} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import type {DefaultValues, Path} from 'react-hook-form';

import type {AnyRecord, FormFields} from '../dataModel';

import {useRouteData} from './RouteDataProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldsProps<FORM extends FormFields> = {control: Control<FORM, any>};
type FieldsComponent<FORM extends FormFields> = ({control}:FieldsProps<FORM>) => JSX.Element;

type EditorProps<FORM extends FormFields> = {
  defaultValues: DefaultValues<FORM>;
  fields: FieldsComponent<FORM>;
};

// TODO: Parameterize with type and value of defaultValues.
function Editor<FORM extends FormFields>({defaultValues, fields}: EditorProps<FORM>) {
  const {data, isLoading, error, update} = useRouteData();
  const location = useLocation();

  const methods = useForm<FORM>({
    defaultValues,
  });
  const {control, handleSubmit, reset} = methods;

  // Load data from useRouteData
  useEffect(() => {
    console.log('Editor: useEffect triggered');
    console.log(`Editor: data: ${JSON.stringify(data, null, 2)}`);
    console.log(`Editor: location.pathname: ${location.pathname}`);

    // Skip if data is not available yet
    if (!data || !data.detail) {
      console.log('Editor: No data available, skipping form reset');
      return;
    }

    // Verify that the current path matches the data path
    if (data.path !== location.pathname) {
      console.log(
        `Editor: Path mismatch: current=${location.pathname}, data=${data.path}`,
      );
      return;
    }

    // Path and data are consistent, proceed with form reset
    try {
      console.log(
        `Editor: Resetting form with record data: ${JSON.stringify(data.detail, null, 2)}`,
      );

      // Use setTimeout to ensure this happens in the next event loop tick
      // This helps avoid race conditions with React's rendering
      setTimeout(() => {
        reset(data.detail.fields as unknown as FORM);
      }, 0);
    } catch (err) {
      console.error('Editor: Error setting form data:', err);
    }
  }, [data, reset, location.pathname]);

  const onSubmit = (detail: FORM) => {
    if (data && data.detail) {
      const updatedData = {
        ...data.detail,
        fields: detail,
      };
      update(data?.type, updatedData as unknown as AnyRecord);
    } else {
      console.error('No data available to update');
    }
  };

  // TODO: review this long list of if/else statements.
  // Are they all needed?
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!data || !data.detail) {
    return <div>No data available</div>;
  } else if (data.path !== location.pathname) {
    return (
      <div>
        Path mismatch: expected '{location.pathname}', got '{data.path}'
      </div>
    );
  } else {
    return (
      // TODO: remove the <> and </> tags.
      <>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 max-w-xl mx-auto space-y-4"
          >
            {/* TODO: render children here. */}
            {/* TODO: how is control passed down / made available to children JSX? */}
            {/* <label className="text-xs text-gray-500 mt-1 block m-0">Name</label>
            <div className="flex space-x-2 items-start">
              <div className="flex-1">
                <textarea
                  className="border px-2 py-1 rounded w-full m-0"
                  {...control.register('name' as Path<FORM>)}
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
                  {...control.register('description' as Path<FORM>)}
                  placeholder="Description"
                  rows={3}
                />
              </div>
            </div> */}

            {fields({control})}
            {/* <ProjectFields control={control} /> */}
            {/* {Fields({control})} */}

            {/* TODO: after children are rendered */}

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

export const SuiteFields = <FORM extends FormFields>({control}:FieldsProps<FORM>) => {
  return (
    <>
      <h1>Suite Editor</h1>
      <label className="text-xs text-gray-500 mt-1 block m-0">Name</label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className="border px-2 py-1 rounded w-full m-0"
            {...control.register('name' as Path<FORM>)}
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
            {...control.register('description' as Path<FORM>)}
            placeholder="Description"
            rows={3}
          />
        </div>
      </div>
    </>
  );
}

export function ProjectFields<FORM extends FormFields>({control}:FieldsProps<FORM>) {
  return (
    <>
      <h1>Project Editor</h1>
      <label className="text-xs text-gray-500 mt-1 block m-0">Name</label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className="border px-2 py-1 rounded w-full m-0"
            {...control.register('name' as Path<FORM>)}
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
            {...control.register('description' as Path<FORM>)}
            placeholder="Description"
            rows={3}
          />
        </div>
      </div>
    </>
  );
}

export default Editor;
