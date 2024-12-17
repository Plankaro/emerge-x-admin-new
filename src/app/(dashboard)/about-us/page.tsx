'use client'
import OurMission from "@/components/about/OurMission";
import OurTeam from "@/components/about/OurTeam";
import OurVision from "@/components/about/OurVision";
import TrustedTopCompanies from "@/components/about/TrustedTopCompanies";
import HeroSection from "@/components/blogs/HeroSection";
import React from "react";
export interface HeroSectionData {
  heading: string;
  banner: File | null;
  description: string;
}
const page = () => {
  const handleHeroSubmit = (data: HeroSectionData) => {
    console.log("Hero Section Submitted Data:", data);
    alert("Hero Section submitted successfully!");
  };
  return (
    
    <div className=" w-full  pt-4 space-y-5">
      <HeroSection onSubmit={handleHeroSubmit} headingText="Hero Section Details"/>
      <OurVision />
      <OurMission />
      <OurTeam />
      <TrustedTopCompanies />
    </div>
  );
};

export default page;
