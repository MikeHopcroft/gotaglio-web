import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

export default function KeywordsField({path}: {path: string}) {
  const {control} = useFormContext();

  return (
    <>
      <Controller
        name={path}
        control={control}
        render={({field}) => (
          <CreatableSelect
            isMulti
            value={field.value.map(tag => ({label: tag, value: tag}))}
            onChange={selected => {
              field.onChange(selected.map(opt => opt.value));
            }}
            onBlur={field.onBlur}
            options={['abc', 'def', 'ghi'].map(tag => ({
              label: tag,
              value: tag,
            }))}
            placeholder="Select or create tags"
            unstyled
            classNames={{
              control: ({isFocused}) => `border px-2 py-1 rounded w-full m-0 ${isFocused ? 'border-2' : ''}`,

              multiValue: () =>
                'flex items-center bg-blue-500 rounded-full px-2 py-0.5 text-sm',

              multiValueLabel: () => 'px-1 text-white ',

              multiValueRemove: () =>
                'ml-1 text-blue-300 hover:text-white cursor-pointer',

              valueContainer: () => 'flex flex-wrap gap-1',

              input: () => 'text-sm text-gray-700 min-w-[4rem]',

              placeholder: () => 'text-sm text-gray-400',

              menu: () => 'mt-2 border border-gray-200 shadow-lg bg-white z-50',

              option: ({isFocused, isSelected}) => `
                px-4 py-2 text-sm cursor-pointer transition
                ${isSelected ? 'bg-blue-100 text-blue-800' : ''}
                ${isFocused && !isSelected ? 'bg-blue-50' : ''}
              `,
            }}
          />
        )}
      />
    </>
  );
}
