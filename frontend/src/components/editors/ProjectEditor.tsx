import React from 'react';
import {Path, useFormContext} from 'react-hook-form';

import type {FormFields} from '../../dataModel';

import Instructions from '../Instructions';
import Markdown from '../Markdown';

import Editor from './Editor';

const text = `
# Projects

_Projects_ serve as top-level containers for a collection
of related _Suites_, _Annotations_, and _Runs_.

Each _Project_ is associated with a single GoTaglio pipeline.
`;

function ProjectEditor({group = false}) {
  if (group) {
    return (
      <>
        <Markdown>{text}</Markdown>
        <Instructions type="Project" />
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
        <ProjectEditorFields />
      </Editor>
    );
  }
}

function ProjectEditorFields<FORM extends FormFields>() {
  const {register} = useFormContext()
  return (
    <>
      <h1 className="h1">Project Editor</h1>
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

export default ProjectEditor;
