import React, { useState } from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";

export interface MultiImageData {
    heading: string;
    banners: File[]; // Array of File objects
    description: string;
}

interface HeroSectionProps {
    onSubmit: (data: MultiImageData) => void;
    headingText: string;
}

const MultiImage: React.FC<HeroSectionProps> = ({ onSubmit,headingText }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<MultiImageData>();

    const [previews, setPreviews] = useState<string[]>([]); // Array of preview URLs

    const onFormSubmit = (data: MultiImageData) => {
        onSubmit(data);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: ControllerRenderProps<MultiImageData, "banners">
    ) => {
        const files = event.target.files;
        if (!files) return;

        const fileArray = Array.from(files);
        const currentFiles = field.value || []; // Existing files in the field

        // Restrict total files to 2
        const newFiles = currentFiles.concat(fileArray).slice(0, 2);

        // Update the preview URLs
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

        setPreviews(newPreviews);
        field.onChange(newFiles);
    };

    const removeImage = (
        index: number,
        field: ControllerRenderProps<MultiImageData, "banners">
    ) => {
        const currentFiles = field.value || [];
        const updatedFiles = currentFiles.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        setPreviews(updatedPreviews);
        field.onChange(updatedFiles);
    };

    return (
        <div className="border rounded-lg p-4">
            <div className="mx-auto">
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

                    {/* Banner Images */}
                    <div>
                        <label
                            htmlFor="heroBanners"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Banner Images
                        </label>
                        <Controller
                            name="banners"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value && value.length > 0 ? true : "At least one image is required",
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="heroBanners"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(event) => handleFileChange(event, field)}
                                        disabled={previews.length >= 2} // Disable when two images are uploaded
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {previews.length > 0 && (
                                        <div className="mt-4 flex space-x-4">
                                            {previews.map((preview, index) => (
                                                <div
                                                    key={index}
                                                    className="relative w-24 h-24 border rounded-lg overflow-hidden"
                                                >
                                                    <img
                                                        src={preview}
                                                        alt={`Banner Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index, field)}
                                                        className="absolute top-1 right-1  text-white rounded-full p-1"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        />
                        {errors.banners && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.banners.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
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

export default MultiImage;
