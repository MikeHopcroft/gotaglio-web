import React from 'react';

import AnnotationEditor from './AnnotationEditor';
import ProjectEditor from './ProjectEditor';
import RecordEditor from './RecordEditor';
import RunViewer from './RunViewer';
import SessionEditor from './SessionEditor';
import SuiteEditor from './SuiteEditor';

type DetailPaneProps = {
  type: string;
};

function DetailPane({type}: DetailPaneProps) {
  if (type === 'annotations') {
    return <AnnotationEditor />;
  } else if (type === 'cases') {
    return <RecordEditor />;
  } else if (type === 'projects') {
    return <ProjectEditor />;
  } else if (type === 'suites') {
    return <SuiteEditor />;
  } else if (type === 'sessions') {
    return <SessionEditor />;
  } else if (type === 'runs') {
    return <RunViewer />;
  } else {
    return <div>Unsupported type {type}.</div>;
  }
}

export default DetailPane;
