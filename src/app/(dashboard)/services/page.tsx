'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../../components/ui/button';

interface HeroSectionData {
    heading: string;
    description: string;
    banner: FileList | null;
}

interface WhatsNewSectionData {
    title: string;
    subtitle: string;
    image: FileList | null;
}

interface ServicesSectionData {
    serviceName: string;
    serviceDescription: string;
    serviceImage: FileList | null;
}

const HeroSection: React.FC = () => {
    // Initialize forms for each section
    const { register: heroRegister, handleSubmit: handleHeroSubmit, formState: { errors: heroErrors } } = useForm<HeroSectionData>();
    const { register: whatsNewRegister, handleSubmit: handleWhatsNewSubmit, formState: { errors: whatsNewErrors } } = useForm<WhatsNewSectionData>();
    const { register: servicesRegister, handleSubmit: handleServicesSubmit, formState: { errors: servicesErrors } } = useForm<ServicesSectionData>();

    // Submit handlers for each section
    const onHeroSubmit: SubmitHandler<HeroSectionData> = (data) => {
        console.log('Hero Section Data:', data);
        alert('Hero Section Submitted!');
    };

    const onWhatsNewSubmit: SubmitHandler<WhatsNewSectionData> = (data) => {
        console.log('What\'s New Section Data:', data);
        alert('What\'s New Section Submitted!');
    };

    const onServicesSubmit: SubmitHandler<ServicesSectionData> = (data) => {
        console.log('Services Section Data:', data);
        alert('Services Section Submitted!');
    };

    const heroDataDummy = [
        {
            heading: "Welcome to Our Website",
            description: "This is the description for the hero section. It describes the main feature of the website.",
            banner: "https://www.ilovepdf.com/storage/blog/217-1681477508-Covert-Photo-to-PDF.png" // Placeholder image URL
        }
    ];

    const whatsNewDataDummy = [
        {
            title: "New Feature Launched",
            subtitle: "This is a new exciting feature that we have launched.",
            image: "https://www.ilovepdf.com/storage/blog/217-1681477508-Covert-Photo-to-PDF.png" // Placeholder image URL
        }
    ];

    const servicesDataDummy = [
        {
            serviceName: "Web Development",
            serviceDescription: "We provide professional web development services.",
            serviceImage: "https://www.ilovepdf.com/storage/blog/217-1681477508-Covert-Photo-to-PDF.png" // Placeholder image URL
        }
    ];


    return (
        <div className="container">
            {/* Hero Section */}
            <div className="bg-gray-50 py-5 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Hero Section Details
                    </h2>
                    <form onSubmit={handleHeroSubmit(onHeroSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="hero-heading" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                id="hero-heading"
                                {...heroRegister('heading', { required: 'Title is required' })}
                                type="text"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {heroErrors.heading && <p className="text-red-500 text-sm mt-1">{heroErrors.heading.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="hero-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="hero-description"
                                {...heroRegister('description', { required: 'Description is required' })}
                                rows={4}
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {heroErrors.description && <p className="text-red-500 text-sm mt-1">{heroErrors.description.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="hero-banner" className="block text-sm font-medium text-gray-700 mb-2">
                                Banner Image
                            </label>
                            <input
                                id="hero-banner"
                                {...heroRegister('banner', { required: 'Banner image is required' })}
                                type="file"
                                accept="image/*"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {heroErrors.banner && <p className="text-red-500 text-sm mt-1">{heroErrors.banner.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-300">
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Hero Section Data</h3>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 text-center">Heading</th>
                                <th className="border p-2 text-center">Description</th>
                                <th className="border p-2 text-center">Banner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heroDataDummy.map((data, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{data.heading}</td>
                                    <td className="border p-2 text-center">{data.description}</td>
                                    <td className="border p-2 text-center">
                                        <a href={data.banner} target="_blank" rel="noopener noreferrer">
                                            View Banner
                                        </a>
                                        <img
                                            src={data.banner}
                                            alt="Banner"
                                            className="w-full sm:w-32 h-32 object-cover mx-auto"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* What's New Section */}
            <div className="bg-gray-50 py-6 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Whats New Section Details
                    </h2>
                    <form onSubmit={handleWhatsNewSubmit(onWhatsNewSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="whatsnew-title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                id="whatsnew-title"
                                {...whatsNewRegister('title', { required: 'Title is required' })}
                                type="text"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {whatsNewErrors.title && <p className="text-red-500 text-sm mt-1">{whatsNewErrors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="whatsnew-subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                            </label>
                            <input
                                id="whatsnew-subtitle"
                                {...whatsNewRegister('subtitle', { required: 'Subtitle is required' })}
                                type="text"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {whatsNewErrors.subtitle && <p className="text-red-500 text-sm mt-1">{whatsNewErrors.subtitle.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="whatsnew-image" className="block text-sm font-medium text-gray-700 mb-2">
                                Image
                            </label>
                            <input
                                id="whatsnew-image"
                                {...whatsNewRegister('image', { required: 'Image is required' })}
                                type="file"
                                accept="image/*"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {whatsNewErrors.image && <p className="text-red-500 text-sm mt-1">{whatsNewErrors.image.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-300">
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Whats New Section Data</h3>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 text-center">Heading</th>
                                <th className="border p-2 text-center">Description</th>
                                <th className="border p-2 text-center">Banner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whatsNewDataDummy.map((data, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{data.title}</td>
                                    <td className="border p-2 text-center">{data.subtitle}</td>
                                    <td className="border p-2 text-center">
                                        <a href={data.image} target="_blank" rel="noopener noreferrer">
                                            View Banner
                                        </a>
                                        <img
                                            src={data.image}
                                            alt="Banner"
                                            className="w-full sm:w-32 h-32 object-cover mx-auto"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Services Section */}
            <div className="bg-gray-50 py-5 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Services Section Details
                    </h2>
                    <form onSubmit={handleServicesSubmit(onServicesSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="services-name" className="block text-sm font-medium text-gray-700 mb-2">
                                Service Name
                            </label>
                            <input
                                id="services-name"
                                {...servicesRegister('serviceName', { required: 'Service name is required' })}
                                type="text"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {servicesErrors.serviceName && <p className="text-red-500 text-sm mt-1">{servicesErrors.serviceName.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="services-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="services-description"
                                {...servicesRegister('serviceDescription', { required: 'Description is required' })}
                                rows={4}
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {servicesErrors.serviceDescription && <p className="text-red-500 text-sm mt-1">{servicesErrors.serviceDescription.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="services-image" className="block text-sm font-medium text-gray-700 mb-2">
                                Service Image
                            </label>
                            <input
                                id="services-image"
                                {...servicesRegister('serviceImage', { required: 'Service image is required' })}
                                type="file"
                                accept="image/*"
                                className="block w-full px-4 py-2 border rounded-lg shadow-sm"
                            />
                            {servicesErrors.serviceImage && <p className="text-red-500 text-sm mt-1">{servicesErrors.serviceImage.message}</p>}
                        </div>

                        <Button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-blue-300">
                            Submit
                        </Button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Services Section Data</h3>
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 text-center">Heading</th>
                                <th className="border p-2 text-center">Description</th>
                                <th className="border p-2 text-center">Banner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicesDataDummy.map((data, index) => (
                                <tr key={index}>
                                    <td className="border p-2 text-center">{data.serviceName}</td>
                                    <td className="border p-2 text-center">{data.serviceDescription}</td>
                                    <td className="border p-2 text-center">
                                        <a href={data.serviceImage} target="_blank" rel="noopener noreferrer">
                                            View Banner
                                        </a>
                                        <img
                                            src={data.serviceImage}
                                            alt="Banner"
                                            className="w-full sm:w-32 h-32 object-cover mx-auto"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>


        </div>
    );
};

export default HeroSection;