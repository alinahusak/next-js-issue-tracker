import prisma from '@/prisma/client';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import delay from 'delay';
import { Card, Flex, Heading, Text } from '@radix-ui/themes/dist/cjs/components/index.js';
import {IssueStatusBadge} from '@/app/components';

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
        <Heading>{issue.title}</Heading>
    <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
     <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
     </Card>
    </div>
  )
}

export default IssueDetailPage