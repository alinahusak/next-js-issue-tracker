import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/dist/client/components/not-found";
import IssueFormSkeleton from "../[id]/loading";
import dynamic from "next/dynamic";

interface Props {
  params: {
    id: string;
  };
}

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton />
  }
);
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
