import {PlusCircleIcon} from '@heroicons/react/24/outline';
import React from 'react';
import type {Path} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Editor, {FieldsProps} from './Editor';

function AnnotationsEditor({group = false}) {
  if (group) {
    return (
      <>
        <h1 className="h1">Annotation Instructions</h1>

        <p>
          <em>Annotations</em> define a schema and process for labelling
          with test cases in <em>Suites</em> and <em>Runs</em>.
        </p>

        <p>
          Annotations specify
          <ul className="list-disc list-inside space-y-2">
            <li className="text-gray-700">fields to be associated with each test case</li>
            <li className="text-gray-700">instructions for users labelling cases</li>
            <li className="text-gray-700">a template for presenting the case to the user</li>
          </ul>
        </p>

        <p>
          Click on any Annotation to edit or press the
          <PlusCircleIcon className="inline ml-1 mr-1 size-5 text-blue-500 hover:text-blue-700" />
          button to start a new Annotation.
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
      <h1>Annotation Editor</h1>
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

      <label className="text-xs text-gray-500 mt-1 block m-0">
        Instructions
      </label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className="border px-2 py-1 rounded w-full m-0"
            {...control.register('instructions' as Path<FORM>)}
            placeholder="Instructions"
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
            {...control.register('template' as Path<FORM>)}
            placeholder="Template"
            rows={3}
          />
        </div>
      </div>
    </>
  );
};

export default AnnotationsEditor;
