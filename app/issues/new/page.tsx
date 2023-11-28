'use client';
import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
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
	return (
		<form
			/* use axios to send our data to the backend API */
			onSubmit={handleSubmit(async (data) => {
				await axios.post('/api/issues', data);
				router.push('/issues');
			})}
			className='max-w-xl space-y-3'>
			<TextField.Root>
				{/* destructure register to get all the props */}
				<TextField.Input placeholder='Title' {...register('title')} />
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
	);
};

export default NewIssuePage;
