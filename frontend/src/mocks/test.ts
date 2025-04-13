import {BaseRecord} from '../dataModel';

import {convert, nodeMapping} from './service';
import {Index, buildIndexes} from './store';

///////////////////////////////////////////////////////////////////////////////
//
// Sample usage
//
///////////////////////////////////////////////////////////////////////////////
export function go() {
  const dataStore = buildIndexes();
  console.log(JSON.stringify(dataStore, null, 2));

  console.log('\n\n\n\n');
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log(
    '///////////////////////////////////////////////////////////////////////////////',
  );
  console.log('\n\n\n\n');

  const expanded = convert(
    dataStore as unknown as Record<string, Index<BaseRecord>>,
    nodeMapping,
    ['projects'],
    [
      {type: 'projects', id: 2},
      {type: 'suites', id: 6},
    ],
  );
  console.log(JSON.stringify(expanded, null, 2));
}

// go();

// npx tsx src/test.ts

go()
