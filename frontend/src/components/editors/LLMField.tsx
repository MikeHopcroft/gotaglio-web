import {
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/solid';
import {Serializable} from 'child_process';
import get from 'lodash/get';
import React, {useState} from 'react';
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
} from 'react-hook-form';

const mockLLMResponse: Serializable = {
  items: [
    {
      name: 'Double Wiseguy',
      options: [
        {
          amount: 'No',
          name: 'Tomato',
        },
        {
          amount: 'Extra',
          name: 'Mayo',
        },
      ],
    },
  ],
};

type LLMFieldProps<FormValues extends FieldValues> = {
  path: Path<FormValues>;
};

function LLMField<FormValues extends FieldValues>({
  path,
}: LLMFieldProps<FormValues>) {
  const [loading, setLoading] = React.useState(false);

  const {
    clearErrors,
    control,
    formState: {errors},
    getValues,
    setError,
  } = useFormContext<FormValues>();

  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(getValues(path), null, 2),
  );
  const [parseError, setParseError] = useState<string | null>(null);

  const error = get(errors, path);

  async function onGuess(path: Path<FormValues>) {
    setLoading(true);
    clearErrors(path);

    try {
      // Simulate an async API call
      const response = await new Promise<Serializable>((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.2) {
            resolve(mockLLMResponse);
          } else {
            reject(new Error('Failed to fetch response from LLM'));
          }
        }, 2000),
      );
      // Update the agent field with the response
      setJsonText(JSON.stringify(response, null, 2));
      setError(path, {message: 'items.0 missing `type` field.'});
      // setValue(path, response as PathValue<FormValues, Path<FormValues>>, {
      //   shouldValidate: true,
      //   shouldDirty: true,
      // });
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({field: {onChange, onBlur}, fieldState: {error}}) => {
              return (
                <div>
                  <textarea
                    className={`border px-2 py-1 rounded w-full ${
                      loading ? 'bg-gray-100 text-gray-500' : 'bg-white'
                    }`}
                    value={jsonText}
                    placeholder="Response"
                    rows={5}
                    disabled={loading}
                    onChange={e => {
                      const newText = e.target.value;
                      setJsonText(newText);

                      try {
                        const parsed = JSON.parse(newText);
                        setParseError(null);
                        onChange(parsed); // only update if valid
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      } catch (err: any) {
                        setParseError(err.message);
                      }
                    }}
                    onBlur={onBlur}
                  />
                  {/* {parseError && (
                    <p className="text-red-500 text-sm">
                      Parse error: {parseError}
                    </p>
                  )} */}
                  {/* {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )} */}
                </div>
              );
            }}
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
          {parseError && (
            <p className="text-red-500 text-sm">Parse error: {parseError}</p>
          )}
          {error && <div className="text-red-500">{error.message}</div>}
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

export default LLMField;
