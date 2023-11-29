import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/* @ represents the root of our project in vscode, hence we have @/prisma/client */
import prisma from '@/prisma/client';

/*zod helps with data validation
title is gotten from issue model with minimum character of 1 and maximum character of 255
description is gotten from issue model as well
*/
const createIssueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().min(1, 'Description is required'),
});

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
