import React from 'react';

import AnnotationEditor from './AnnotationEditor';
import CaseEditor from './CaseEditor';
import ProjectEditor from './ProjectEditor';
import RunViewer from './RunViewer';
import SessionEditor from './SessionEditor';
import SuiteEditor from './SuiteEditor';

type DetailPaneProps = {
  type: string;
  group?: boolean;
};

function DetailPane({type, group=false}: DetailPaneProps) {
  if (type === 'annotations') {
    return <AnnotationEditor group={group}/>;
  } else if (type === 'cases') {
    return <CaseEditor />;
  } else if (type === 'projects') {
    return <ProjectEditor group={group} />;
  } else if (type === 'suites') {
    return <SuiteEditor group={group} />;
  } else if (type === 'sessions') {
    return <SessionEditor group={group} />;
  } else if (type === 'runs') {
    return <RunViewer group={group} />;
  } else {
    return <div>Unsupported type {type}.</div>;
  }
}

export default DetailPane;
