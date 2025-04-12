import React from 'react';
import {useParams} from 'react-router-dom';

import SuiteEditor from './SuiteEditor';
import {suite} from '../sample-data';

function SuiteDetail() {
  // const caseData = {
  //   title: 'Login flow is broken',
  //   description: 'Login button does not respond',
  //   priority: 'High' as const,
  // };
  // const caseData = suite.cases[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = (updatedCase: any) => {
    console.log('Saving case:', updatedCase);
    // You can call an API or update state here
  };

  // const {caseId} = useParams();
  const {suiteId} = useParams(); // Assuming you have a suiteName or similar identifier in your params

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Suite {suiteId}</h2>
      <SuiteEditor initialData={suite} onSave={handleSave} />
    </div>
  );
}

export default SuiteDetail;
