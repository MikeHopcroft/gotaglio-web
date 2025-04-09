import React, {useEffect} from 'react';
import {
  useFormContext,
  useWatch,
} from 'react-hook-form';

export default function KeywordsField({ path }: { path: string }) {
  const { setValue, control } = useFormContext();

  // Watch the array value from the form state
  const watchedValue = useWatch({ control, name: path }) ?? [];

  // Local string state for the input
  const [inputValue, setInputValue] = React.useState(watchedValue.join(", "));

  // Sync inputValue when the form field changes (e.g. on reset)
  useEffect(() => {
    setInputValue(watchedValue.join(", "));
  }, [watchedValue.join(", ")]); // dependency as string to avoid unnecessary updates

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => {
        const keywords = inputValue
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        setValue(path, keywords, { shouldValidate: true });
      }}
      className="block w-full border rounded px-3 py-2"
      placeholder="e.g. apple, banana, cherry"
    />
  );
}
