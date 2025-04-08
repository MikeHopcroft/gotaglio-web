import React, {useEffect, useRef} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';

type Turn = {
  id: string;
  user: string;
  agent: string;
};

const STORAGE_KEY = 'my-records';

type FormValues = {
  initial: string;
  turns: Turn[];
};

export default function RecordEditor() {
  const {control, handleSubmit, reset, watch} = useForm<FormValues>({
    defaultValues: {turns: []},
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'turns',
  });
  const isInitialLoad = useRef(true);

  // Load from localStorage
  useEffect(() => {
    console.log(
      `[${new Date().toLocaleTimeString()}]: Loading data from localStorage`,
    );
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        console.log(JSON.stringify(parsed, null, 2));
        reset(parsed);
      } catch {
        console.error('Failed to parse data');
      }
    }
  }, [reset]);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false; // Skip saving during the initial load
      return;
    }
    const subscription = watch(value => {
      console.log(
        `[${new Date().toLocaleTimeString()}]: Saving data to localStorage`,
      );
      const raw = JSON.stringify(value, null, 2);
      console.log(raw);
      localStorage.setItem(STORAGE_KEY, raw);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    console.log('Submitted data:', data);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Case 123456789</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 max-w-xl mx-auto space-y-4"
      >
        <div>
          <textarea
        className="border px-2 py-1 rounded w-full"
        {...control.register('initial')}
        placeholder="Initial context"
        rows={3}
          />
          <label className="text-xs text-gray-500">Initial context</label>
        </div>
        {fields.map((field, index) => (
          <div
        key={field.id}
        className="border p-4 rounded space-y-2"
          >
        <div>
          <textarea
            className="border px-2 py-1 rounded w-full"
            {...control.register(`turns.${index}.user` as const)}
            placeholder="User query"
            rows={3}
          />
          <label className="text-xs text-gray-500">User query</label>
        </div>
        <div>
          <textarea
            className="border px-2 py-1 rounded w-full"
            {...control.register(`turns.${index}.agent` as const)}
            placeholder="Response"
            rows={3}
          />
          <label className="text-xs text-gray-500">Response</label>
        </div>
        <button
          type="button"
          className="text-red-500 hover:underline"
          onClick={() => remove(index)}
        >
          Delete Turn
        </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => append({id: crypto.randomUUID(), user: '', agent: ''})}
        >
          Add Turn
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
