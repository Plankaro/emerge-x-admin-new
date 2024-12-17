import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import Editor from "./editor/editor";

export interface BlogsFormData {
    title: string;
    htmlBody: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}

interface BlogsFormProps {
    onSubmit: (data: BlogsFormData) => void;
    initialData: Partial<BlogsFormData>;
}

const BlogsForm: React.FC<BlogsFormProps> = ({ onSubmit, initialData }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BlogsFormData>({
        defaultValues: {
            title: initialData.title || "",
            htmlBody: initialData.htmlBody || "",
            bannerImage: initialData.bannerImage || null,
            futureImages: initialData.futureImages || null,
            description: initialData.description || "",
        },
    });

    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [posterPreview, setPosterPreview] = useState<string | null>(null);

    const onFormSubmit = (data: BlogsFormData) => {
        onSubmit(data);
    };

    const defaultValue = {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: []
            }
        ]
    }

    const [content, setContent] = useState<string>('')


    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Heading */}
            <div>
                <label
                    htmlFor="heading"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Heading
                </label>
                <input
                    id="title"
                    {...register("title", {
                        required: "Heading is required",
                        maxLength: {
                            value: 50,
                            message: "Heading must be 50 characters or less",
                        },
                    })}
                    type="text"
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                    <p className="mt-1 text-[10px] text-red-600">{errors.title.message}</p>
                )}
            </div>

            {/* Details */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Details
                </label>
                <textarea
                    id="description"
                    {...register("description", {
                        required: "Details is required",
                    })}
                    rows={1}
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                    <p className="mt-1 text-[10px] text-red-600">{errors.description.message}</p>
                )}
            </div>

            {/* Banner Image */}
            <div>
                <label
                    htmlFor="banner"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Banner Image
                </label>
                <Controller
                    name="bannerImage"
                    control={control}
                    rules={{
                        required: "Banner image is required",
                    }}
                    render={({ field }) => (
                        <>
                            <input
                                id="bannerImage"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files?.[0] || null;
                                    if (file) {
                                        const previewUrl = URL.createObjectURL(file);
                                        setBannerPreview(previewUrl);

                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const base64String = reader.result?.toString() || null;
                                            field.onChange(base64String);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        field.onChange(null);
                                    }
                                }}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {bannerPreview && (
                                <div className="mt-4">
                                    <img
                                        src={bannerPreview}
                                        alt="Banner Image Preview"
                                        className="rounded-lg"
                                        width={100}
                                        height={200}
                                    />
                                </div>
                            )}
                        </>
                    )}
                />
                {errors.bannerImage && (
                    <p className="mt-1 text-[10px] text-red-600">{errors.bannerImage.message}</p>
                )}
            </div>

            {/* Poster Image */}
            <div>
                <label
                    htmlFor="poster"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Poster Image
                </label>
                <Controller
                    name="futureImages"
                    control={control}
                    rules={{
                        required: "Poster image is required",
                    }}
                    render={({ field }) => (
                        <>
                            <input
                                id="futureImages"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.target.files?.[0] || null;
                                    if (file) {
                                        const previewUrl = URL.createObjectURL(file);
                                        setPosterPreview(previewUrl);

                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const base64String = reader.result?.toString() || null;
                                            field.onChange(base64String);
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        field.onChange(null);
                                    }
                                }}
                                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {posterPreview && (
                                <div className="mt-4">
                                    <img
                                        src={posterPreview}
                                        alt="Poster Preview"
                                        className="rounded-lg"
                                        width={100}
                                        height={200}
                                    />
                                </div>
                            )}
                        </>
                    )}
                />
                {errors.futureImages && (
                    <p className="mt-1 text-[10px] text-red-600">{errors.futureImages.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="htmlBody"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Description
                </label>
                {/* <textarea
                    id="htmlBody"
                    {...register("htmlBody", {
                        required: "Description is required",
                    })}
                    rows={4}
                    className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                /> */}

                <Editor initialValue={defaultValue} onChange={setContent} />
                {errors.htmlBody && (
                    <p className="mt-1 text-[10px] text-red-600">{errors.htmlBody.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <Button
                    type="submit"
                    className="w-full bg-[#3DA229B3] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#3DA229] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default BlogsForm;
