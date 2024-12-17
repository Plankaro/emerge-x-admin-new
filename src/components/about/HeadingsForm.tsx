import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../ui/button";
import { HeadingsFormValues } from "./Types";

interface HeadingsFormProps {
  onSubmitForm: (data: HeadingsFormValues) => void;
}

const schema = yup.object().shape({
  heading: yup
    .string()
    .required("Heading is required")
    .min(3, "Heading must be at least 3 characters"),
});

const HeadingsForm: React.FC<HeadingsFormProps> = ({ onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeadingsFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: HeadingsFormValues) => {
    onSubmitForm(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            {...register("heading")}
            placeholder="Enter heading"
            className={`border w-full outline-none px-4 py-2 rounded-md ${
              errors.heading ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.heading && (
            <p className="text-red-500 text-sm mt-1">
              {errors.heading.message}
            </p>
          )}
        </div>
        <div>
          <Button type="submit" className="bg-[#3DA229B3] hover:bg-[#3DA229]">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default HeadingsForm;
