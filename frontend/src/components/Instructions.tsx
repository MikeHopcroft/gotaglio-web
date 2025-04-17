import {PlusCircleIcon} from '@heroicons/react/24/outline';
import React from 'react';

function Instructions({type}: {type: string}) {
  return (
    <p className="text-base mb-4">
      Click on any {type} to edit or press the
      <PlusCircleIcon className="inline ml-1 mr-1 size-5 text-blue-500 hover:text-blue-700" />
      button to start a new {type}.
    </p>
  );
}

export default Instructions;
