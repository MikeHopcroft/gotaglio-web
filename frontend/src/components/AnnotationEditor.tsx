import React from 'react';
import type {Path} from 'react-hook-form';

import type {FormFields} from '../dataModel';

import Editor, {FieldsProps} from './Editor';

function AnnotationsEditor() {
  return (<Editor defaultValues={{name: '', description: '', instructions: '', template: ''}} fields={x}/>)
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
