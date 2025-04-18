import React from 'react';
import type {Path} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Instructions from '../Instructions';
import Markdown from '../Markdown';

import Editor2 from './Editor2';
import {useEditorContext} from './EditorProvider';

const text = `
## Annotations
_Annotations_ define a schema and process for labelling test cases in _Suites_ and _Runs_.

Annotations specify
- new fields to be associated with each test case
- instructions for users labelling cases
- a template for presenting each case to the user

A labelling _Session_ is associated with an _Annotation_ specification and a set of for test cases from a _Suite_ or a _Run_.
`;

function AnnotationsEditor({group = false}) {
  if (group) {
    return (
      <>
        <Markdown>{text}</Markdown>
        <Instructions type="Annotation" />
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
        <AnnotationEditorFields />
      </Editor2>
    );
  }
}

function AnnotationEditorFields<FORM extends FormFields>() {
  const {control} = useEditorContext<FORM>();
  return (
    <>
      <h1 className="h1">Annotation Editor</h1>
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
}

export default AnnotationsEditor;
