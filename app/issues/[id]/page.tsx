import prisma from '@/prisma/client';
import React from 'react'
import { notFound } from 'next/navigation';
import delay from 'delay';

interface Props {
    params: {
        id: string;
    }
}
const IssueDetailPage = async ({ params }: Props) => {
    const issue= await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    });

    await delay(2000);

    if (!issue) {
      notFound();
    }

  return (
    <div>
        <h1>{issue.title}</h1>
        <p>{issue.description}</p>
        <p>Status: {issue.status}</p>
        <p>Created at: {issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage