import {
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';
import get from 'lodash/get';
import React from 'react';
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from 'react-hook-form';

type LLMFieldProps<FormValues extends FieldValues> = {
  path: Path<FormValues>;
};

export default function LLMField2<FormValues extends FieldValues>({
  path,
}: LLMFieldProps<FormValues>) {
  const [loading, setLoading] = React.useState(false);

  const {
    clearErrors,
    control,
    formState: {errors},
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

  console.log('LLMField: path', path);

  return (
    <>
      <label className="text-xs text-gray-500">Response</label>
      <div className="flex space-x-2 items-start">
        <div className="flex-1">
          <Controller
            name={path}
            control={control}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <div>
                <textarea
                  className={`border px-2 py-1 rounded w-full ${
                    loading ? 'bg-gray-100 text-gray-500' : 'bg-white'
                  }`}
                  value={JSON.stringify(value, null, 2)}
                  placeholder="Response"
                  rows={5}
                  disabled={loading}
                  onChange={e => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      onChange(parsed);
                    } catch (err) {
                      // Ignore parse error here – you can handle it with validation if desired
                      console.log(`LLMField2: Invalid JSON`, err);
                      onChange(e.target.value);
                    }
                  }}
                  onBlur={onBlur}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </div>
            )}
            rules={{
              validate: value => {
                try {
                  JSON.stringify(value); // ensure it's serializable
                  return true;
                } catch (err) {
                  return `Invalid JSON object:: ${err.message}`;
                }
              },
            }}
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
