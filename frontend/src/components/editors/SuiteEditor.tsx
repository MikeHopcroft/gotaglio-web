import React from 'react';
import {Path, useFormContext} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Instructions from '../Instructions';
import Markdown from '../Markdown';

import Editor from './Editor';

const text = `
# Suites
_Suites_ are collections of test cases that are used to evaluate the performance of a model or system.
`;

function SuiteEditor({group = false}) {
  if (group) {
    return (
      <>
        <Markdown>{text}</Markdown>
        <Instructions type="Suite" />
      </>
    );
  } else {
    return (
      <Editor
        defaultValues={{
          name: '',
          description: '',
          instructions: '',
          template: '',
        }}
      >
        <SuiteEditorFields />
      </Editor>
    );
  }
}

function SuiteEditorFields<FORM extends FormFields>() {
  const {register} = useFormContext()
  return (
    <>
      <h1 className="h1">Suite Editor</h1>
      <label className="text-xs text-gray-500 mt-1 block m-0">Name</label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className="border px-2 py-1 rounded w-full m-0"
            {...register('name' as Path<FORM>)}
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
            {...register('description' as Path<FORM>)}
            placeholder="Description"
            rows={3}
          />
        </div>
      </div>
    </>
  );
}

export default SuiteEditor;
