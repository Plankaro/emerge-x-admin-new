"use client";
import React from "react";

import HeadingsForm from "./HeadingsForm";
import { HeadingsFormValues } from "./Types";

import OurTeamTable from "./OurTeamTable";

const OurTeam = () => {
  const onSubmitForm = (data: HeadingsFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full border rounded-lg p-4">
      <h1 className="text-xl font-bold my-6">Our Team</h1>
      <HeadingsForm onSubmitForm={onSubmitForm} />
      <OurTeamTable />
    </div>
  );
};

export default OurTeam;
