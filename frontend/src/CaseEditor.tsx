import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

// 🧠 Define the form schema
const caseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
});

type CaseFormData = z.infer<typeof caseSchema>;

type Props = {
  initialData?: Partial<CaseFormData>;
  onSave: (data: CaseFormData) => void;
};

export function CaseEditor({ initialData, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || "Medium",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full border border-gray-300 p-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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

      <div>
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select
          {...register("priority")}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
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
