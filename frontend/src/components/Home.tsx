/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import Markdown from './Markdown';

const text = `
# Gotaglio Web Client

Target scenarios include
* Author test cases and organize them into suites
* Annotate cases with user-defined fields for processes ranging from
feature prioritization to recording user judgements of LLM results.
* Run pipelines on suites of cases
* Provide multi-user labelling sessions

Useful links
* [Suite 1](/frame/projects/1/suites/1/)
* [Suite 1, case 1](/frame/projects/1/suites/1/cases/1/)
* [Frame](/frame)
`;

export default function Home() {
  return (
    <>
      <Markdown>{text}</Markdown>
    </>
  );
}
