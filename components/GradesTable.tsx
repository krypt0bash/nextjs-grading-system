import { TableInstance } from 'react-table';

const GradesTable = ({ tableInstance, data, columns }: { tableInstance: TableInstance<>; data: any; columns: any }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
	return (
		<table className='w-full mx-auto bg-gray-200 my-4 rounded-lg border select-none' {...getTableProps()}>
			<thead className='text-gray-600'>
				{headerGroups.map((headerGroup) => (
					<tr className='' {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th className='p-2' {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								{
									<>
										<br />
										<span className='text-xs text-gray-400'>
											{column.isSorted
												? column.isSortedDesc
													? ' Descending'
													: ' Ascending'
												: ''}
										</span>
									</>
								}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className='text-center text-gray-500' {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr className='capitalize' {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
export default GradesTable;
