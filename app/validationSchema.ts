import { z } from 'zod';

/*zod helps with data validation
title is gotten from issue model with minimum character of 1 and maximum character of 255
description is gotten from issue model as well
*/
export const createIssueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255),
	description: z.string().min(1, 'Description is required'),
});
