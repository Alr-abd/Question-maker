
import { PieChart } from '@mui/x-charts/PieChart';
import './Report.css'
import { BarChart } from '@mui/x-charts';
import { read, utils } from 'xlsx';
import { useState } from 'react';

export default function Report() {

    const [data, setData] = useState(null);
    const [chart, setChart] = useState('pie');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.onload = (event) => {
                const workbook = read(event.target.result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetData = utils.sheet_to_json(sheet);

                setData(sheetData);
            };

            reader.readAsBinaryString(file);
        }
    };


    return (
        <main className="w-full p-4 grid grid-cols-1 gap-12 lg:gap-14 lg:p-6">
            <form className="relative bg-[#f7f8fa] h-40 rounded-lg flex flex-col items-center justify-center gap-4">
                <input className='absolute inset-0 opacity-0 cursor-pointer' onDrop={handleFileUpload} onChange={handleFileUpload} type="file" name="fileInput" id="fileInput" accept='.xls, .xlsx' />
                <i className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                </i>
                <label htmlFor='fileInput' className="text-sm font-bold">فایل excel خود را وارد نمایید (XLS, .XLSX.)</label>
            </form>
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">دستگاه‌ها</p>
                    <ul className="flex items-center gap-2">
                        <li onClick={() => setChart('table')} className={`cursor-pointer rounded flex items-center justify-center size-8 hover:bg-[#f7f8fa] ${chart === 'table' ? 'bg-[#EEF0F5]' : ''}`}>
                            <i className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12zm-1-2H3v2a1 1 0 0 0 .883.993L4 19h16a1 1 0 0 0 .993-.883L21 18v-2zm0-4H3v3h18v-3zm0-4H3v3h18V8z" fill="#3E434D" fillRule="nonzero"></path></g></svg>
                            </i>
                        </li>
                        <li onClick={() => setChart('pie')} className={`cursor-pointer rounded flex items-center justify-center size-8 hover:bg-[#f7f8fa] ${chart === 'pie' ? 'bg-[#EEF0F5]' : ''}`}>
                            <i className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M13 4v7h7v1a8 8 0 1 1-8-8h1zm-1 1-.24.004A7 7 0 1 0 19 12h-7V5zm2-1 .225.004a6 6 0 0 1 5.77 5.771L20 10h-6V4z" fill="#3E434D"></path></g></svg>
                            </i>
                        </li>
                        <li onClick={() => setChart('bar')} className={`cursor-pointer rounded flex items-center justify-center size-8 hover:bg-[#f7f8fa] ${chart === 'bar' ? 'bg-[#EEF0F5]' : ''}`}>
                            <i className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M21 20v1H3v-1h18zM8 10v8H5v-8h3zm5-7v15h-3V3h3zm5 4v11h-3V7h3z" fill="#3E434D"></path></g></svg>
                            </i>
                        </li>
                    </ul>
                </div>
                {data ? (
                    <div className="direction-ltr min-h-[434px] p-4 border border-dashed border-[#bbbcc0] rounded-lg">
                        {chart === 'pie' ? (
                            <PieChart
                                className='!w-full !h-4/5 lg:!w-4/5 xl:!w-3/4'
                                series={[
                                    {
                                        data: [{ id: 1, value: data[0]['Age'], label: data[0]['First Name'] }, { id: 2, value: data[1]['Age'], label: data[1]['First Name'] }, { id: 3, value: data[2]['Age'], label: data[2]['First Name'] }, { id: 4, value: data[3]['Age'], label: data[3]['First Name'] }, { id: 5, value: data[4]['Age'], label: data[4]['First Name'] }, { id: 6, value: data[5]['Age'], label: data[5]['First Name'] }, { id: 7, value: data[6]['Age'], label: data[6]['First Name'] }]
                                    },
                                ]}
                                margin={{ right: 200 }}
                            />
                        ) : (chart === 'bar') ? (
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: [data[0]['First Name'], data[1]['First Name'], data[2]['First Name'], data[3]['First Name'], data[4]['First Name'], data[5]['First Name'], data[6]['First Name']] }]}
                                series={[{ data: [data[0]['Age'], data[1]['Age'], data[2]['Age'], data[3]['Age'], data[4]['Age'], data[5]['Age'], data[6]['Age']] }]}
                                className='!w-full !h-full'
                            />
                        ) : (
                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Age</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {data.map(d => (
                                                        <tr key={d.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{d['First Name']}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{d['Age']}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : ''}
            </div>
        </main>
    )
}
