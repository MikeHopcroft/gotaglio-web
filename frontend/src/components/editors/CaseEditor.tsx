import {
  ClipboardDocumentCheckIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React from 'react';
import {Path, useFieldArray} from 'react-hook-form';

import type {Case} from '../../dataModel';

import Instructions from '../Instructions';
import Markdown from '../Markdown';
import {useRouteData} from '../RouteDataProvider';

import Editor2 from './Editor2';
import {useEditorContext} from './EditorProvider';
import KeywordsField from './KeywordsField';
import LLMField2 from './LLMField2';

type FormValues = Case['fields'];

const text = `
# Projects

_Cases_ description goes here.
`;

function CaseEditor({group = false}) {
  const {data} = useRouteData();
  console.log('CaseEditor: data', data);

  if (group) {
    return (
      <>
        <Markdown>{text}</Markdown>
        <Instructions type="Project" />
      </>
    );
  } else {
    return (
      <Editor2
        defaultValues={{
          name: '',
          description: '',
          instructions: '',
          template: '',
        }}
      >
        <CaseEditorFields />
      </Editor2>
    );
  }
}

function CaseEditorFields() {
  const {control} = useEditorContext<FormValues>();
  const {fields, append, remove} = useFieldArray<FormValues>({
    control,
    name: 'turns',
  });

  return (
    <>
      <h1 className="h1">Case Editor</h1>
      <label className="text-xs text-gray-500 mt-1 block m-0">
        Description
      </label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className="border px-2 py-1 rounded w-full m-0"
            {...control.register('description' as Path<FormValues>)}
            placeholder="Description"
            rows={3}
          />
        </div>
      </div>

      <label className="text-xs text-gray-500 mt-1 block m-0">Keywords</label>
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
            {...control.register('initial' as Path<FormValues>)}
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
                {...control.register(
                  `turns.${index}.query` as Path<FormValues>,
                )}
                placeholder="User query"
                rows={3}
              />
            </div>
            {/* Invisible spacer to match button width */}
            <div className="w-[100px] shrink-0" />
          </div>
          {/* Response section */}
          <LLMField2<FormValues> path={`turns.${index}.expected`} />
        </div>
      ))}

      <button
        type="button"
        className="w-fit bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
        title="Add turn"
        onClick={() => append({id: crypto.randomUUID(), user: '', agent: ''})}
      >
        <PlusCircleIcon className="size-6 text-blue-500" />
      </button>
    </>
  );
}

export default CaseEditor;
