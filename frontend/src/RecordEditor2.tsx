import {
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import get from 'lodash/get';
import React, {useEffect, useRef} from 'react';
import {
  useForm,
  useFormContext,
  useFieldArray,
  FieldValues,
  FormProvider,
  Path,
  PathValue,
} from 'react-hook-form';

type Turn = {
  id: string;
  user: string;
  agent: string;
};

const STORAGE_KEY = 'my-records';

type FormValues = {
  description: string;
  keywords: string[];
  initial: string;
  turns: Turn[];
};

export default function RecordEditor() {
  const methods = useForm<FormValues>({
    defaultValues: {turns: []},
  });
  const {control, handleSubmit, reset, watch} = methods;
  const {fields, append, remove} = useFieldArray<FormValues>({
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
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 max-w-xl mx-auto space-y-4"
        >
          <label className="text-xs text-gray-500 mt-1 block m-0">
            Description
          </label>
          <div className="flex space-x-2 items-start">
            <div className="flex-1">
              <textarea
                className="border px-2 py-1 rounded w-full m-0"
                {...control.register('description')}
                placeholder="Description"
                rows={3}
              />
            </div>
          </div>

          <label className="text-xs text-gray-500 mt-1 block m-0">
            Initial context
          </label>
          <div className="flex space-x-2 items-start">
            <div className="flex-1">
              <textarea
                className="border px-2 py-1 rounded w-full m-0"
                {...control.register('initial')}
                placeholder="Initial context"
                rows={3}
              />
            </div>

            <div className="flex flex-col space-y-1 w-[100px] shrink-0">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                Validate
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                LLM
              </button>
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border p-4 rounded space-y-2"
            >
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => remove(index)}
                title="Delete turn"
              >
                <TrashIcon className="size-6 text-blue-500" />
              </button>
              {/* User Query section */}
              <label className="text-xs text-gray-500 mt-1 block m-0">
                User query
              </label>
              <div className="flex space-x-2 items-start">
                <div className="flex-1">
                  <textarea
                    className="border px-2 py-1 rounded w-full m-0"
                    {...control.register(`turns.${index}.user` as const)}
                    placeholder="User query"
                    rows={3}
                  />
                </div>
                {/* Invisible spacer to match button width */}
                <div className="w-[100px] shrink-0" />
              </div>
              {/* Response section */}
              <ValidatedField<FormValues> path={`turns.${index}.agent`} />
            </div>
          ))}

          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() =>
              append({id: crypto.randomUUID(), user: '', agent: ''})
            }
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
      </FormProvider>
    </>
  );
}

// type GuessField<F extends FieldValues> = (
//   path: Path<F>,
// ) => Promise<string | Error>;

type ValidatedFieldProps<FormValues extends FieldValues> = {
  // guess: GuessField<FormValues>;
  path: Path<FormValues>;
};

function ValidatedField<FormValues extends FieldValues>({
  path,
}: ValidatedFieldProps<FormValues>) {
  const [loading, setLoading] = React.useState(false);

  const {
    clearErrors,
    formState: {errors},
    register,
    setError,
    setValue,
  } = useFormContext<FormValues>();

  const error = get(errors, path);

  async function onGuess(path: Path<FormValues>) {
    setLoading(true);
    clearErrors(path);

    try {
      // Simulate an async API call
      const response = await new Promise<string>((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.2) {
            resolve(`Generated response for ${path}`);
          } else {
            reject(new Error('Failed to fetch response from LLM'));
          }
        }, 2000),
      );
      // Update the agent field with the response
      setValue(path, response as PathValue<FormValues, Path<FormValues>>, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (error) {
      console.error('Error:', error);
      setError(path, error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Response section */}
      <label className="text-xs text-gray-500">Response</label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <textarea
            className={`border px-2 py-1 rounded w-full ${
              loading ? 'bg-gray-100 text-gray-500' : ''
            }`}
            {...register(path)}
            placeholder="Response"
            rows={3}
            disabled={loading}
          />
          {error && <div className="text-red-500">Error text</div>}
        </div>
        <div className="flex flex-col space-y-1 w-[100px] shrink-0">
          <button
            type="button"
            className="w-fit bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            title="Validate field"
          >
            <ClipboardDocumentCheckIcon className="size-6 text-blue-500" />
          </button>
          <button
            type="button"
            className="w-fit bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
            onClick={() => onGuess(path)}
            title="Fill with LLM response"
          >
            <ChatBubbleLeftEllipsisIcon className="size-6 text-blue-500" />
            {/* {loading ? 'Loading...' : 'LLM'} */}
          </button>
        </div>
      </div>
    </>
  );
}
