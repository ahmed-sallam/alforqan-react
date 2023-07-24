import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore'
import { PiLinkSimple } from 'react-icons/pi'

import { db, auth } from '../firebase';
function Index() {
    let { name } = useParams();
    const navigate = useNavigate();

    const { state } = useLocation();
    const [students, setStudents] = useState({});
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalparts, setTotalparts] = useState(0);
    const [totalAverage, setTotalAverage] = useState(0);
    const fetchData = async () => {



        const studentsRef = collection(db, "students");
        const studentsQuery = query(studentsRef, where("teacher", "==", name));
        const studentsDocs = await getDocs(studentsQuery);

        let studentsData = []
        studentsDocs.forEach(doc => {
            studentsData.push({
                id: doc.id, ...doc.data()
            })
        })
        console.log(studentsData);
        setTotalStudents(studentsData.length)
        const parts = studentsData.reduce((a, b) => a + b.totalParts, 0)
        setTotalparts(parts)
        const total = studentsData.reduce((a, b) => a + b.total, 0)

        setTotalAverage(formatAsPercentage(total / parts))
        setStudents(studentsData);


    }
    const handleNavigate = (path) => {
        navigate(path)
        // navigate(path, { state: { userType, uid } })
    }

    function formatAsPercentage(num) {
        return new Intl.NumberFormat('default', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num / 100);
    }


    useEffect(() => {
        fetchData().catch(error => { console.log("Students fetch data error", error); })

    }, [])
    return (
        <div className='p-6 relative '>

            <div className='flex flex-row  justify-between aitems-center   max-w-full mb-5 bg-white p-4 rounded-md' style={{ width: "900px", alignItems: "center" }}>
                <div className='flex flex-row ' style={{ alignItems: "center" }}>

                    <div className='flex flex-col mx-4'>
                        <h1 className='font-extrabold text-3xl'>{name}</h1>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row justify-between p-2 '><p className='ml-4 font-bold' >عدد الطلاب</p> <span>{totalStudents}</span></div>
                            <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold'>عدد الاجزاء</p> <span>{totalparts}</span></div>
                            <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold' >معدل الطلاب</p> <span>{totalAverage}</span></div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            {/* <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold' >معدل الطلاب</p> <span>{ }</span></div> */}
                            {/* <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold'>التقدير</p> <span>{ }</span></div> */}
                        </div>
                    </div>
                </div>

            </div>

            <div >

                <table className="table p-4 bg-white rounded-lg shadow w-auto max-w-full ">
                    <thead className='bg-mcolor-500'>
                        <tr>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                #
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                الاسم
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                عدد الاجزاء
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                الدرجة
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                التقييم
                            </th>

                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                خيارات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 && students.map((student, index) => (
                            <tr className="text-gray-700" key={student.id}>
                                <td className="border p-4 border-dark-500">
                                    {student.id}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {student.name}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {student.totalParts}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {student.average}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {student.rate}
                                </td>

                                <td className="border p-4 border-dark-500 text-xl ">
                                    <div className='cursor-pointer' onClick={() => handleNavigate('/dash/exam/' + student.id)}>
                                        <PiLinkSimple className='m-auto text-scolor-1000' /></div>
                                </td>
                            </tr>)
                        )}

                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Index