import {
  ClipboardDocumentCheckIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, {useEffect, useRef} from 'react';
import {useForm, useFieldArray, FormProvider} from 'react-hook-form';

import KeywordsField from './KeywordsField2';
import LLMField from './LLMField';

type Turn = {
  id: string;
  user: string;
  agent: string;
};

const STORAGE_KEY = 'my-records';

type FormValues = {
  id: string;
  description: string;
  keywords: string[];
  initial: string;
  turns: Turn[];
};

export default function RecordEditor() {
  const methods = useForm<FormValues>({
    defaultValues: {
      id: '19be50c2-a332-40d7-828e-5ba51a4016b5',
      keywords: [],
      turns: [],
    },
  });

  const {control, handleSubmit, reset, watch} = methods;
  const {fields, append, remove} = useFieldArray<FormValues>({
    control,
    name: 'turns',
  });
  const isInitialLoad = useRef(true);

  // Load from localStorage
  useEffect(() => {
    console.log(
      `[${new Date().toLocaleTimeString()}]: Loading data from localStorage`,
    );
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log(JSON.stringify(parsed, null, 2));
        reset(parsed);
      } catch {
        console.error('Failed to parse data');
      }
    }
  }, [reset]);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Skip saving during the initial load
      return;
    }
    const subscription = watch(value => {
      console.log(
        `[${new Date().toLocaleTimeString()}]: Saving data to localStorage`,
      );
      // value.id = '19be50c2-a332-40d7-828e-5ba51a4016b5';
      const raw = JSON.stringify(value, null, 2);
      console.log(raw);
      localStorage.setItem(STORAGE_KEY, raw);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    console.log('Submitted data:', data);
  };

  return (
    <>
      <div className="p-4 max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Case {watch('id')}</h1>
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
          className="p-4 max-w-xl mx-auto space-y-4"
        >
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

          <label className="text-xs text-gray-500 mt-1 block m-0">
            Keywords
          </label>
          <div className="flex space-x-2 items-start">
            <div className="flex-1">
              <KeywordsField path="keywords" />
            </div>
          </div>

          <label className="text-xs text-gray-500 mt-1 block m-0">
            Initial context
          </label>
          <div className="flex space-x-2 items-start">
            <div className="flex-1">
              <textarea
                className="border px-2 py-1 rounded w-full m-0"
                {...control.register('initial')}
                placeholder="Initial context"
                rows={3}
              />
            </div>

            <div className="flex flex-col space-y-1 w-[50px] shrink-0">
              <button
                type="button"
                className="w-fit bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                title="Validate field"
              >
                <ClipboardDocumentCheckIcon className="size-6 text-blue-500" />
              </button>
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border bg-gray-100 p-4 rounded space-y-2"
            >
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => remove(index)}
                title="Delete turn"
              >
                <TrashIcon className="size-6 text-blue-500" />
              </button>
              {/* User Query section */}
              <label className="text-xs text-gray-500 mt-1 block m-0">
                User query
              </label>
              <div className="flex space-x-2 items-start">
                <div className="flex-1">
                  <textarea
                    className="border px-2 py-1 rounded w-full m-0 bg-white"
                    {...control.register(`turns.${index}.user` as const)}
                    placeholder="User query"
                    rows={3}
                  />
                </div>
                {/* Invisible spacer to match button width */}
                <div className="w-[100px] shrink-0" />
              </div>
              {/* Response section */}
              <LLMField<FormValues> path={`turns.${index}.agent`} />
            </div>
          ))}

          <button
            type="button"
            // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            className="w-fit bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            title="Add turn"
            onClick={() =>
              append({id: crypto.randomUUID(), user: '', agent: ''})
            }
          >
            <PlusCircleIcon  className="size-6 text-blue-500" />
          </button>
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
