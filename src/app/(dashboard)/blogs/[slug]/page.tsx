"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useCreateBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } from "@/store/api/blogs";
import RichTextEditor from "@/components/blogs/ritch-text-editor";

export interface BlogsFormData {
    title: string;
    htmlBody: string;
    description: string;
    bannerImage: string | null;
    futureImages: string | null;
}


const BlogDetailsPage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch
    } = useForm<BlogsFormData>();

    const router = useRouter();
    const pathname = usePathname();
    const [id, setId] = useState<string>("")
    const { data: BlogsData, refetch } = useGetSingleBlogQuery({ id });
    const [createBlog] = useCreateBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [heroBannerPreview, setHeroBannerPreview] = useState<string | null>(null);
    const [featureImagePreview, setFeatureImagePreview] = useState<string | null>(null);

    const defaultValue = {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: []
            }
        ]
    }


    useEffect(() => {
        if (!pathname) return;

        const IdData = pathname?.split("/").pop();
        if (!IdData) return;
        console.log(IdData === "add-new")
        setIsLoading(IdData === "add-new" && false)

        setId(IdData)
        refetch();
    }, [pathname]);

    useEffect(() => {


        setValue("title", BlogsData?.blog?.title);
        setValue("htmlBody", BlogsData?.blog?.htmlBody);
        setValue("description", BlogsData?.blog?.description);
        setValue("bannerImage", BlogsData?.blog?.bannerImage);
        setValue("futureImages", BlogsData?.blog?.futureImages);
        setHeroBannerPreview(BlogsData?.blog?.bannerImage || null);
        setFeatureImagePreview(BlogsData?.blog?.futureImages || null);
        setIsLoading(false)
    }, [BlogsData]);

    const isBase64 = (str: string) => {
        // A regex to check if the string is base64
        const base64Regex = /^([A-Za-z0-9+/=]{4})*(?:[A-Za-z0-9+/=]{2}==|[A-Za-z0-9+/=]{3}=)?$/;
        return base64Regex.test(str);
    };

    const isS3Url = (url: string) => {
        const s3UrlRegex = /^https:\/\/emerge-x-web\.s3\.us-east-1\.amazonaws\.com\//;
        return s3UrlRegex.test(url);
    };

    const handleHeroSubmit = async (data: BlogsFormData) => {
        console.log(data)
        setIsLoading(true)
        if (id !== "add-new") {
            try {
                const updatedData = {
                    ...data,
                    bannerImage: isS3Url(data?.bannerImage as string) ? null : data.bannerImage,
                    futureImages: isS3Url(data?.futureImages as string) ? null : data.futureImages,
                };
                console.log("🚀 ~ handleHeroSubmit ~ updatedData:", updatedData)
                await updateBlog({ id: id as string, data }).unwrap();
                toast.success("Blogs updated successfully!");
                router.push("/blogs");
                setIsLoading(false)
            } catch (error) {
                toast.error("Error updating blogs. Please try again.");
                setIsLoading(false)
            }
        } else {
            try {
                await createBlog(data).unwrap();
                setIsLoading(false)
                toast.success("Blogs created successfully!");
                router.push("/blogs");

            } catch (error) {
                toast.error("Error creating blog. Please try again.");
                setIsLoading(false)

            }
        }
    };



    return (
        <div className="w-full container mx-auto pt-4 space-y-5">
            <div className="border rounded p-4">
                <div className="mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">
                        Blog Details
                    </h2>
                    {
                        isLoading && id !== "add-new" ?
                            <Loader />
                            :

                            <form className="space-y-6" >
                                {/* Heading */}
                                <div>
                                    <label
                                        htmlFor="title"
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
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                                </div>

                                {/* Banner Image */}
                                <div>
                                    <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
                                    <Controller
                                        name="bannerImage"
                                        control={control}
                                        rules={{ required: "Image is required" }}
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
                                                            setHeroBannerPreview(previewUrl)
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
                                                {heroBannerPreview && (
                                                    <div className="mt-4">
                                                        <img src={heroBannerPreview} alt="Hero Banner Preview" className="rounded-lg" width={100} height={200} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                    {errors.bannerImage && <p className="mt-1 text-sm text-red-600">{errors.bannerImage.message}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        id="description"
                                        {...register("description", { required: "Description is required" })}
                                        rows={4}
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                                </div>


                                {/* Poster Image */}
                                <div>
                                    <label htmlFor="futureImages" className="block text-sm font-medium text-gray-700 mb-2">Poster Image</label>
                                    <Controller
                                        name="futureImages"
                                        control={control}
                                        rules={{ required: "Image is required" }}
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
                                                            setFeatureImagePreview(previewUrl)
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
                                                {featureImagePreview && (
                                                    <div className="mt-4">
                                                        <img src={featureImagePreview} alt="Feature Image Preview" className="rounded-lg" width={100} height={200} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    />
                                    {errors.futureImages && <p className="mt-1 text-sm text-red-600">{errors.futureImages.message}</p>}
                                </div>

                                {/* Description 1 */}
                                {/* <div> */}
                                {/* <label htmlFor="htmlBody" className="block text-sm font-medium text-gray-700 mb-2">Description 2  </label> */}
                                {/* <textarea
                                        id="htmlBody"
                                        {...register("htmlBody", { required: "Description is required" })}
                                        rows={4}
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    /> */}
                                {/* <Editor initialValue={defaultValue} onChange={setContent} /> */}

                                {/* <Editor initialValue={defaultValue} onChange={(e) => { field.onChange(e); }} /> */}
                                {/* {errors.htmlBody && <p className="mt-1 text-sm text-red-600">{errors.htmlBody.message}</p>} */}
                                {/* </div> */}


                                <div className="h-72">
                                    <label htmlFor="htmlBody" className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                                    {/* <textarea
                                        id="htmlBody"
                                        {...register("htmlBody", { required: "HtmlBody is required" })}
                                        rows={4}
                                        className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    /> */}


                                    <RichTextEditor
                                        value={watch("htmlBody")}
                                        setValue={(value) => setValue("htmlBody", value)}
                                    />
                                    {errors.htmlBody && <p className="mt-1 text-sm text-red-600">{errors.htmlBody.message}</p>}
                                </div>



                                {/* Submit Button */}
                                <div className="pt-24">
                                    <Button
                                        type="button"
                                        onClick={handleSubmit(handleHeroSubmit)}
                                        className=" bg-[#3DA229B3] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#3DA229] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {
                                            isLoading ? <Loader /> : "Submit"
                                        }
                                    </Button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsPage;
