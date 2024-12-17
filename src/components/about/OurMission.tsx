"use client";
import React from "react";

import HeadingsForm from "./HeadingsForm";
import { HeadingsFormValues } from "./Types";

import PosterImageUpdate from "./PosterImageUpdate";

const OurMission = () => {
  const onSubmitForm = (data: HeadingsFormValues) => {
    console.log(data);
  };


  return (
    <div className=" border rounded-lg p-4 space-y-4">
      <h1 className="text-xl font-bold my-6">Our Mission</h1>
      <HeadingsForm onSubmitForm={onSubmitForm} />
      <div>
        <PosterImageUpdate />
      </div>
    </div>
  );
};

export default OurMission;
