import React, {useEffect, useRef, useState} from 'react';

type Record = {
  id: string;
  name: string;
  age: number;
};

const STORAGE_KEY = 'my-records';

export default function RecordEditor() {
  const [records, setRecords] = useState<Record[]>([]);
  const isInitialLoad = useRef(true);

  // Load from localStorage
  useEffect(() => {
    console.log(
      `[${new Date().toLocaleTimeString()}]: Loading records from localStorage`,
    );
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log(JSON.stringify(parsed, null, 2));
        setRecords(parsed);
      } catch {
        console.error('Failed to parse records');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Skip saving during the initial load
      return;
    }
    console.log(
      `[${new Date().toLocaleTimeString()}]: Saving records to localStorage`,
    );
    const raw = JSON.stringify(records, null, 2);
    console.log(raw);
    localStorage.setItem(STORAGE_KEY, raw);
  }, [records]);

  const handleChange = (
    id: string,
    field: keyof Record,
    value: string | number,
  ) => {
    setRecords(recs =>
      recs.map(rec => (rec.id === id ? {...rec, [field]: value} : rec)),
    );
  };

  const addRecord = () => {
    setRecords(recs => [...recs, {id: crypto.randomUUID(), name: '', age: 0}]);
  };

  const deleteRecord = (id: string) => {
    setRecords(recs => recs.filter(rec => rec.id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      {records.map(record => (
        <div key={record.id} className="flex gap-2 items-center">
          <input
            className="border px-2 py-1 rounded w-1/2"
            value={record.name}
            onChange={e => handleChange(record.id, 'name', e.target.value)}
            placeholder="Name"
          />
          <input
            className="border px-2 py-1 rounded w-1/4"
            type="number"
            value={record.age}
            onChange={e =>
              handleChange(record.id, 'age', Number(e.target.value))
            }
            placeholder="Age"
          />
          <button
            className="text-red-500 hover:underline"
            onClick={() => deleteRecord(record.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={addRecord}
      >
        Add Record
      </button>
    </div>
  );
}
