import Navbar from '@components/Navbar';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useSortBy, useTable } from 'react-table';
import { GetServerSidePropsContext } from 'next';
import { useMemo } from 'react';
import GradesTable from '@components/GradesTable';
import Button from '@components/Button';

const AccountPage = ({
	profile,
	classroom,
	grades,
}: {
	profile: { id: number; full_name: string; avatar_url: string; role: string };
	classroom: { id: number; name: string };
	grades: { id: number; created_at: string; value: number; subject_name: string }[];
}) => {
	const user = useUser();
	const data = useMemo(() => grades, []);
	const columns = useMemo(
		() => [
			{
				Header: 'Grade',
				accessor: 'value',
			},
			{
				Header: 'Subject',
				accessor: 'subject_name',
			},
			{
				Header: 'Date',
				accessor: 'created_at',
			},
		],
		[]
	);
	//TODO: Modify cols type
	const tableInstance = useTable({ columns, data }, useSortBy);
	return (
		<>
			<Navbar />
			<div className='w-4/5 mx-auto mt-12'>
				<div className='m-2'>
					<div className='bg-gradient-to-br rounded-t-lg w-full h-48 from-purple-200 to-indigo-200 border border-indigo-200' />
					<img
						className='w-24 h-24 ml-8 -translate-y-14 rounded-full border-4 border-white fixed'
						src={
							profile?.avatar_url
								? profile.avatar_url
								: `https://ui-avatars.com/api/name=${profile?.full_name}`
						}
					/>

					<div className='pt-14 p-6'>
						<div className='flex flex-col md:flex-row justify-between'>
							<div>
								<p className='uppercase text-xs text-zinc-600'>{profile.role}</p>
								<h1 className='text-xl font-semibold text-zinc-800'>
									{profile.full_name} &bull; {classroom?.name}
								</h1>
								<Button text='Change password' />
							</div>
						</div>
						<h2 className='text-sm text-zinc-400'>{user?.email}</h2>
						{profile?.role !== 'admin' ? (
							<div className='mt-8'>
								<h3 className='text-3xl text-zinc-800'>Grades</h3>
								// ? Find the correct type & modify
								<GradesTable tableInstance={tableInstance} data={data} columns={columns} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</>
	);
};

export default AccountPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};

	const {
		data: { user },
	} = await supabase.auth.getUser();
	const { data: classroomObject } = await supabase.from('classrooms').select('*').eq('user_id', user?.id).single();

	const { data: classroom } = await supabase
		.from('classroom')
		.select('*')
		.eq('id', classroomObject?.class_id)
		.single();

	const { data: grades } = await supabase.from('grade').select('*').eq('user_id', user?.id);
	const { data: profile } = await supabase.from('profile').select('*').eq('id', user?.id).single();
	grades?.map((grade) => (grade.created_at = new Date(Date.parse(grade.created_at)).toLocaleString('eu-RO')));

	return {
		props: {
			classroom,
			grades,
			profile,
		},
	};
}
