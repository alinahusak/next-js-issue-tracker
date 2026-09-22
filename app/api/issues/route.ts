import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth/next";

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  if (!issues) {
    return NextResponse.json({ error: "No issues found" }, { status: 404 });
  }
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ errors: validation.error }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
