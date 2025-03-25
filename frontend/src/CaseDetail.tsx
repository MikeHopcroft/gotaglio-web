import React from 'react';
import { useParams } from 'react-router-dom';

function CaseDetail() {
  const { caseId } = useParams();

  return (
    <div>
      <h3>Case {caseId}</h3>
    </div>
  );
}

export default CaseDetail;
