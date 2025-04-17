import {PlusCircleIcon} from '@heroicons/react/24/outline';
import React from 'react';
import type {Path} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Editor, {FieldsProps} from './Editor';

function SuiteEditor({group = false}) {
  if (group) {
    return (
      <>
        <h1 className="h1">Suite Instructions</h1>
        <p>A <em>Suite</em> is a collection of test cases.</p>
        <p>
          Click on any suite to edit or press the
          <PlusCircleIcon className="inline ml-1 mr-1 size-5 text-blue-500 hover:text-blue-700" />
          button to start a new Suite.
        </p>
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
        fields={x}
      />
    );
  }
}

const x = <FORM extends FormFields>({control}: FieldsProps<FORM>) => {
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
};

export default SuiteEditor;
