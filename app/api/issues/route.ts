import { NextRequest, NextResponse } from 'next/server';

/* @ represents the root of our project in vscode, hence we have @/prisma/client */
import prisma from '@/prisma/client';
import { createIssueSchema } from '../../validationSchema';

export async function POST(request: NextRequest) {
	const body = await request.json();

	/* use this to validate the body which contains our data */
	const validation = createIssueSchema.safeParse(body);

	/*if validation is not successful */
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), {
			/* 400 means bad request, client sent invaid data */
			status: 400,
		});
	}
	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	});
	return NextResponse.json(newIssue, { status: 201 });
}
