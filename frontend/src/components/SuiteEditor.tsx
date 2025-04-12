// import React from "react";

// function SuiteHome() {
//   return <p>Select a case on the left to view details.</p>;
// }

// export default SuiteHome;


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

// 🧠 Define the form schema
const suiteSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
});

type SuiteFormData = z.infer<typeof suiteSchema>;

type Props = {
  initialData?: Partial<SuiteFormData>;
  onSave: (data: SuiteFormData) => void;
};

function SuiteEditor({ initialData, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuiteFormData>({
    resolver: zodResolver(suiteSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      // priority: initialData?.priority || "Medium",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1">name</label>
        <input
          {...register("name")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default SuiteEditor;