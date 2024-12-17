"use client";
import React from "react";

import HeadingsForm from "./HeadingsForm";
import { HeadingsFormValues } from "./Types";
import OurVisionTable from "./Table";


const OurVision = () => {
  const onSubmitForm = (data: HeadingsFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full border rounded-lg p-4">
      <h1 className="text-xl font-bold my-6">Our Vision</h1>
      {/* <HeadingsForm onSubmitForm={onSubmitForm} /> */}
      <OurVisionTable />
     
    </div>
  );
};

export default OurVision;
