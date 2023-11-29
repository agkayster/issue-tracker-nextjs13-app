'use client';
import { TextField, Button, Callout } from '@radix-ui/themes';
import * as React from 'react';
import { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { FiAlertTriangle } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
/* use this router because it works with appRouter, latest with nextjs */
import { useRouter } from 'next/navigation';

interface IssueForm {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	/* destructure props from our useForm */
	const { register, control, handleSubmit } = useForm<IssueForm>();
	const [error, setError] = useState('');
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
			<form
				/* use axios to send our data to the backend API */
				onSubmit={handleSubmit(async (data) => {
					/* use try/catch block to handle/capture errors for the user */
					try {
						await axios.post('/api/issues', data);
						router.push('/issues');
					} catch (error) {
						console.log('get error =>', error);
						setError('An unexpected error occured');
					}
				})}
				className='space-y-3'>
				<TextField.Root>
					{/* destructure register to get all the props */}
					<TextField.Input
						placeholder='Title'
						{...register('title')}
					/>
				</TextField.Root>
				{/* use Controller because we can't use register destructure as above */}
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder='Description' {...field} />
					)}
				/>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;
