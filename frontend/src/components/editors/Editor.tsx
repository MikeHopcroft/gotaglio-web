import {TrashIcon} from '@heroicons/react/24/solid';
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import type {DefaultValues} from 'react-hook-form';

import type {AnyRecord, FormFields} from '../../dataModel';
import {useRouteData} from '../RouteDataProvider';

type EditorProps<FORM extends FormFields> = {
  defaultValues: DefaultValues<FORM>;
  children: React.ReactNode; // Now accepts React children instead of a fields function
};

function Editor<FORM extends FormFields>({
  defaultValues,
  children,
}: EditorProps<FORM>) {
  const {data, isLoading, error, update} = useRouteData();
  const location = useLocation();

  const methods = useForm<FORM>({
    defaultValues,
  });
  const {handleSubmit, reset} = methods;

  // Load data from useRouteData
  useEffect(() => {
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
      // Use setTimeout to ensure this happens in the next event loop tick
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
      <>
        <div className="relative p-4 max-w-5xl mx-auto space-y-4">
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            onClick={() => alert('Delete case')}
            title="Delete case"
          >
            <TrashIcon className="size-6 text-blue-500" />
          </button>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 max-w-5xl mx-auto space-y-4"
          >
            {children}
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

export default Editor;
