// EditorContext.tsx
import React, {createContext, useContext} from 'react';
import {Control, UseFormReturn} from 'react-hook-form';
import type {FormFields} from '../../dataModel';

// Create a context that will provide the form methods
type EditorContextType<FORM extends FormFields> = {
  formMethods: UseFormReturn<FORM>;
  control: Control<FORM>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditorContext = createContext<EditorContextType<any> | null>(null);

export function useEditorContext<FORM extends FormFields>() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context as EditorContextType<FORM>;
}

function EditorProvider<FORM extends FormFields>({
  children,
  formMethods,
}: {
  children: React.ReactNode;
  formMethods: UseFormReturn<FORM>;
}) {
  const value = {
    formMethods,
    control: formMethods.control,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export default EditorProvider;
