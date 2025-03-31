"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { useCreateNewsMutation, useGetSingleNewsQuery, useUpdateNewsMutation } from "@/store/api/news";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import RichTextEditor from "@/components/blogs/ritch-text-editor";


export interface NewsSectionData {
  heading: string;
  mainDescription: string;
  description1: string;
  description2: string;
  finalDescription: string;
  heroBanner: string | null;
  featureImage: string | null;
  subFeatureImage1: string | null;
  subFeatureImage2: string | null;
}



const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue
  } = useForm<NewsSectionData>();
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const router = useRouter();
  const pathname = usePathname();
  const [id, setId] = useState<string>("")
  const { data: NewsData, refetch } = useGetSingleNewsQuery({ id });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [heroBannerPreview, setHeroBannerPreview] = useState<string | null>(null);
  const [featureImagePreview, setFeatureImagePreview] = useState<string | null>(null);
  const [subFeatureImage1Preview, setSubFeatureImage1Preview] = useState<string | null>(null);
  const [subFeatureImage2Preview, setSubFeatureImage2Preview] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const IdData = pathname?.split("/").pop();
    if (!IdData) return;
    console.log(IdData !== "add-new")
    setId(IdData)
    refetch();
  }, [pathname]);

  useEffect(() => {
    setValue("heading", NewsData?.news?.heading);
    setValue("mainDescription", NewsData?.news?.mainDescription);
    setValue("description1", NewsData?.news?.description1);
    setValue("description2", NewsData?.news?.description2);
    setValue("finalDescription", NewsData?.news?.finalDescription);
    setValue("heroBanner", NewsData?.news?.heroBanner);
    setValue("featureImage", NewsData?.news?.featureImage);
    setValue("subFeatureImage1", NewsData?.news?.subFeatureImage1);
    setValue("subFeatureImage2", NewsData?.news?.subFeatureImage2);

    setHeroBannerPreview(NewsData?.news?.heroBanner || null);
    setFeatureImagePreview(NewsData?.news?.featureImage || null);
    setSubFeatureImage1Preview(NewsData?.news?.subFeatureImage1 || null);
    setSubFeatureImage2Preview(NewsData?.news?.subFeatureImage2 || null);
  }, [NewsData]);

  const isS3Url = (url: string) => {
    const s3UrlRegex = /^https:\/\/emerge-x-web\.s3\.us-east-1\.amazonaws\.com\//;
    return s3UrlRegex.test(url);
  };


  const isBase64 = (str: string) => {
    // A regex to check if the string is base64
    const base64Regex = /^([A-Za-z0-9+/=]{4})*(?:[A-Za-z0-9+/=]{2}==|[A-Za-z0-9+/=]{3}=)?$/;
    return base64Regex.test(str);
  };


  const handleHeroSubmit = async (data: NewsSectionData) => {
    // Validate required fields
    if (!data.heading) {
      toast.error("Heading is required!");
      setIsLoading(false);
      return;
    }
    if (!data.heroBanner) {
      toast.error("Banner image is required!");
      setIsLoading(false);
      return;
    }
    if (!data.mainDescription) {
      toast.error("Description is required!");
      setIsLoading(false);
      return;
    }
    if (!data.featureImage) {
      toast.error("Poster Image is required!");
      setIsLoading(false);
      return;
    }
    if (!data.description1) {
      toast.error("Description 1 is required!");
      setIsLoading(false);
      return;
    }
    if (!data.description2) {
      toast.error("Description 2 is required!");
      setIsLoading(false);
      return;
    }

    if (!data.subFeatureImage1) {
      toast.error("Sub Feature Image 1 is required!");
      setIsLoading(false);
      return;
    }
    if (!data.subFeatureImage2) {
      toast.error("Sub Feature Image 2 is required!");
      setIsLoading(false);
      return;
    }
    if (!data.finalDescription) {
      toast.error("Final Description is required!");
      setIsLoading(false);
      return;
    }

    setIsLoading(true)
    if (id !== "add-new") {
      try {
        const updatedData = {
          ...data,
          // heroBanner: isBase64(data?.heroBanner as string) ? data.heroBanner : null,
          // featureImage: isBase64(data?.featureImage as string) ? data.featureImage : null,
          // subFeatureImage1: isBase64(data?.subFeatureImage1 as string) ? data.subFeatureImage1 : null,
          // subFeatureImage2: isBase64(data?.subFeatureImage2 as string) ? data.subFeatureImage2 : null,
          heroBanner: isS3Url(data?.heroBanner as string) ? null : data.heroBanner,
          featureImage: isS3Url(data?.featureImage as string) ? null : data.featureImage,
          subFeatureImage1: isS3Url(data?.subFeatureImage1 as string) ? null : data.subFeatureImage1,
          subFeatureImage2: isS3Url(data?.subFeatureImage2 as string) ? null : data.subFeatureImage2,
        };
        console.log("🚀 ~ handleHeroSubmit ~ updatedData:", updatedData)
        await updateNews({ id: id as string, data: updatedData }).unwrap();
        toast.success("News updated successfully!");
        router.push("/news");
        setIsLoading(false)
      } catch (error) {
        toast.error("Error updating news. Please try again.");
        setIsLoading(false)
      }
    } else {
      try {
        await createNews(data).unwrap();
        setIsLoading(false)
        toast.success("News created successfully!");
        router.push("/news");

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
            News Hero section
          </h2>
          <form className="space-y-6">
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

                })}
                type="text"
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.heading && <p className="mt-1 text-sm text-red-600">{errors.heading.message}</p>}
            </div>

            {/* Banner Image */}
            <div>
              <label htmlFor="heroBanner" className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
              <Controller
                name="heroBanner"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id="heroBanner"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (file) {
                          if (file.size > 1048576) {
                            toast.error("File size must be less than 1MB");
                            setHeroBannerPreview(null);
                            field.onChange(null);
                            event.target.value = "";
                            return;
                          }
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
              {errors.heroBanner && <p className="mt-1 text-sm text-red-600">{errors.heroBanner.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="heroDescription" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <RichTextEditor
                value={watch("mainDescription")} // Watch the form value for "mainDescription"
                setValue={(value) => setValue("mainDescription", value)}  // Update the "mainDescription" field in the form
              />
              {errors.mainDescription && <p className="mt-1 text-sm text-red-600">{errors.mainDescription.message}</p>}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">News First Section</h2>

            {/* Poster Image */}
            <div>
              <label htmlFor="featureImage" className="block text-sm font-medium text-gray-700 mb-2">Poster Image</label>
              <Controller
                name="featureImage"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id="featureImage"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (file) {
                          if (file.size > 1048576) {
                            toast.error("File size must be less than 1MB");
                            setFeatureImagePreview(null);
                            field.onChange(null);
                            event.target.value = "";
                            return;
                          }
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
              {errors.featureImage && <p className="mt-1 text-sm text-red-600">{errors.featureImage.message}</p>}
            </div>

            {/* Description 1 */}
            <div>
              <label htmlFor="description1" className="block text-sm font-medium text-gray-700 mb-2">Description 1  </label>
              <RichTextEditor
                value={watch("description1")} // Watch the form value for "description1"
                setValue={(value) => setValue("description1", value)}  // Update the "description1" field in the form
              />
              {errors.description1 && <p className="mt-1 text-sm text-red-600">{errors.description1.message}</p>}
            </div>

            <div>
              <label htmlFor="description2" className="block text-sm font-medium text-gray-700 mb-2">Description 2</label>
              <RichTextEditor
                value={watch("description2")} // Watch the form value for "description1"
                setValue={(value) => setValue("description2", value)}  // Update the "description1" field in the form
              />
              {errors.description2 && <p className="mt-1 text-sm text-red-600">{errors.description2.message}</p>}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">News Second Section</h2>

            {/* Image 1 */}
            <div>
              <label htmlFor="subFeatureImage1" className="block text-sm font-medium text-gray-700 mb-2">Sub Image 1</label>
              <Controller
                name="subFeatureImage1"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id="subFeatureImage1"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (file) {
                          if (file.size > 1048576) {
                            toast.error("File size must be less than 1MB");
                            setSubFeatureImage1Preview(null);
                            field.onChange(null);
                            event.target.value = "";
                            return;
                          }
                          const previewUrl = URL.createObjectURL(file);
                          setSubFeatureImage1Preview(previewUrl)
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
                    {subFeatureImage1Preview && (
                      <div className="mt-4">
                        <img src={subFeatureImage1Preview} alt="Sub Feature Image 1 Preview" className="rounded-lg" width={100} height={200} />
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            {/* Image 2 */}
            <div>
              <label htmlFor="subFeatureImage2" className="block text-sm font-medium text-gray-700 mb-2">Sub Image 2</label>
              <Controller
                name="subFeatureImage2"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id="subFeatureImage2"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(event) => {
                        const file = event.target.files?.[0] || null;
                        if (file) {
                          if (file.size > 1048576) {
                            toast.error("File size must be less than 1MB");
                            setSubFeatureImage2Preview(null);
                            field.onChange(null);
                            event.target.value = "";
                            return;
                          }
                          const previewUrl = URL.createObjectURL(file);
                          setSubFeatureImage2Preview(previewUrl)
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
                    {subFeatureImage2Preview && (
                      <div className="mt-4">
                        <img src={subFeatureImage2Preview} alt="Sub Feature Image 2 Preview" className="rounded-lg" width={100} height={200} />
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="finalDescription" className="block text-sm font-medium text-gray-700 mb-2">Final Description </label>
              <RichTextEditor
                value={watch("finalDescription")} // Watch the form value for "description1"
                setValue={(value) => setValue("finalDescription", value)}  // Update the "description1" field in the form
              />
              {errors.finalDescription && <p className="mt-1 text-sm text-red-600">{errors.finalDescription.message}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <Button
                disabled={isLoading}
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
        </div>
      </div>
    </div>
  );
};

export default Page;
