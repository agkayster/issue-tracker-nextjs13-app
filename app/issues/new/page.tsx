'use client';
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import * as React from 'react';
import { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { FiAlertTriangle } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
/* use this router because it works with appRouter, latest with nextjs */
import { useRouter } from 'next/navigation';
import { createIssueSchema } from '@/app/validationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// interface IssueForm {
// 	title: string;
// 	description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	/* destructure props from our useForm */
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = handleSubmit(async (data) => {
		/* use try/catch block to handle/capture errors for the user */
		try {
			setIsSubmitting(true);
			/* use axios to send our data to the backend API */
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			console.log('get error =>', error);
			setError('An unexpected error occured');
			setIsSubmitting(false);
		}
	});

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' role='alert' className='mb-5'>
					<Callout.Icon>
						<FiAlertTriangle />
					</Callout.Icon>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form onSubmit={onSubmit} className='space-y-3'>
				<TextField.Root>
					{/* destructure register to get all the props */}
					<TextField.Input
						placeholder='Title'
						{...register('title')}
					/>
				</TextField.Root>

				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				{/* use Controller because we can't use register destructure as above */}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>

				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isSubmitting}>
					Submit New Issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
