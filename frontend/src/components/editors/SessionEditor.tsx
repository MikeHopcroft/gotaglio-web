import React from 'react';
import {Path, useFormContext} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Editor from './Editor';

function SessionEditor({group = false}) {
  if (group) {
    return (
      <>
        <h1 className="h1">Session Instructions</h1>
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
        <SessionEditorFields />
      </Editor>
    );
  }
}

function SessionEditorFields<FORM extends FormFields>() {
  const {register} = useFormContext()
  return (
    <>
      <h1>Session Editor 3</h1>
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

export default SessionEditor;
