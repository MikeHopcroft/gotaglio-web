import React from 'react';
import { useParams } from 'react-router-dom';

function CaseDetail() {
  const { caseId } = useParams();

  return (
    <div>
      <h3>Case Detail</h3>
      <p>Viewing case: {caseId}</p>
    </div>
  );
}

export default CaseDetail;
