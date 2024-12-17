import React, { useState } from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { Button } from "../ui/button";

export interface HeroSectionData {
    heading: string;
    banner: File | null;
    description: string ;
}

interface HeroSectionProps {
    onSubmit: (data: HeroSectionData) => void;
    headingText: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSubmit,headingText }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<HeroSectionData>();

    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const onFormSubmit = (data: HeroSectionData) => {
        onSubmit(data);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: ControllerRenderProps<HeroSectionData, "banner">
    ) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setBannerPreview(previewUrl);
        } else {
            setBannerPreview(null);  
        }
        field.onChange(file);
    };

    return (
        <div className="">
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

                    {/* Banner Image */}
                    <div>
                        <label
                            htmlFor="heroBanner"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Banner Image
                        </label>
                        <Controller
                            name="banner"
                            control={control}
                            rules={{
                                required: "Banner image is required",
                            }}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="heroBanner"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => handleFileChange(event, field)}
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {bannerPreview && (
                                        <div className="mt-4">
                                            <img
                                                src={bannerPreview}
                                                alt="Banner Preview"
                                                className=" rounded-lg"
                                                width={100}
                                                height={200}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        />
                        {errors.banner && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.banner.message}
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

export default HeroSection;
