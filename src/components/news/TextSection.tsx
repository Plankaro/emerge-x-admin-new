import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

export interface HeroSectionData {
    heading: string;
    description: string;
}

interface HeroSectionProps {
    onSubmit: (data: HeroSectionData) => void;
    headingText: string;
}

const TextSection: React.FC<HeroSectionProps> = ({ onSubmit, headingText }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<HeroSectionData>();


    const onFormSubmit = (data: HeroSectionData) => {
        onSubmit(data);
    };

   

    return (
        <div className="border rounded-lg p-4">
            <div className="mx-auto ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">
                    {headingText}
                </h2>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    {/* Heading */}
                    <div>
                        <label
                            htmlFor="heroHeading"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Heading
                        </label>
                        <input
                            id="heroHeading"
                            {...register("heading", {
                                required: "Heading is required",
                                maxLength: {
                                    value: 50,
                                    message: "Heading must be 50 characters or less",
                                },
                            })}
                            type="text"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.heading && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.heading.message}
                            </p>
                        )}
                    </div>

                

                    <div>
                        <label
                            htmlFor="heroDescription"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="heroDescription"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            rows={4}
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className=" bg-[#3DA229B3] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#3DA229] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TextSection;
