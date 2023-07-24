import React, { useEffect, useState } from 'react'
import { PiLinkSimple } from 'react-icons/pi'

import Modal from 'react-modal';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore'

import { db, auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom'

function Index() {

    const navigate = useNavigate();
    const { state } = useLocation();
    // const { userType, uid } = state
    const [teachers, setTeachers] = useState([]);


    const [modalIsOpen, setIsOpen] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [students, setStudents] = useState([]);
    const [base, setBase] = useState([]);
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("");

    // const studentRef = collection(db, "students");
    Modal.setAppElement('#root');


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const addStudent = async () => {
        const exams = () => {
            let r = []
            for (let i = 1; i <= 30; i++) {
                r.push({
                    part: i,
                    q1: { m: 0, l: 0, j: 0, total: 0 },
                    q2: { m: 0, l: 0, j: 0, total: 0 },
                    q3: { m: 0, l: 0, j: 0, total: 0 },
                    q4: 0,
                    subTotal: 0,
                    date: "",
                    teacher: "",

                })
            }
            return r;
        }
        try {
            const newStudent = {
                name: studentName,
                average: 0,
                rate: "",
                teacher,
                total: 0,
                totalParts: 0,
                exams: exams()

            }
            const newId = count + 1
            const docRef = await setDoc(doc(db, "students", "" + newId), newStudent);

            setStudents([...students, { id: "" + newId, ...newStudent }]);
            setBase([...students, { id: "" + newId, ...newStudent }]);
            setCount(newId)
        } catch (error) {
            console.log("adding student error", error);
        }
    }

    const resetModalData = () => {
        setStudentName("");
        setTeacher("");
    }
    const handleSubmitNewStudent = () => {
        addStudent();

        // add form validation
        // add loading icon
        closeModal()
        resetModalData()

    }

    const fetchData = async () => {
        try {
            const teachersRef = collection(db, "staff");
            const teachersQuery = query(teachersRef, where("job", "==", "مُحَفِظ"));
            const teachersSnap = await getDocs(teachersQuery);
            let teachersData = []
            teachersSnap.forEach(doc => {
                teachersData.push({
                    id: doc.id, ...doc.data()
                })
            })
            console.log(teachersData);
            setTeachers(teachersData);
        } catch (error) {
            console.log("Teachers fetch data error", error);
        }


        const studentsRef = collection(db, "students");
        const studentsDocs = await getDocs(studentsRef);

        let studentsData = []
        studentsDocs.forEach(doc => {
            studentsData.push({
                id: doc.id, ...doc.data()
            })
        })
        console.log(studentsData);
        setStudents(studentsData);
        setBase(studentsData);
        setCount(studentsData.length);

    }
    const doSearch = (s) => {

        const filteredStudents = base.filter((student) => (student.id.includes(s) || student.name.includes(s)))
        setStudents(filteredStudents);
        console.log("fff", filteredStudents);
    }


    const handleNavigate = (path) => {
        navigate(path)
        // navigate(path, { state: { userType, uid } })
    }

    useEffect(() => {
        fetchData().catch(error => { console.log("Students fetch data error", error); })

    }, [count])


    return (
        <div className='p-6 relative'>
            <div className='flex flex-row  justify-start  w-96 max-w-full mb-5 '>
                <h1 className='font-bold text-2xl mb-3'>الطلاب</h1>
                <div className='bg-white border-0 rounded-md shadow-lg w-full mr-10'>
                    <input type='text' id="search" className='rounded-md border-0 w-96 h-full p-2 text-scolor-1000 focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent' placeholder='اكتب اسم او رقم الطالب'

                        onChange={(e) => {
                            setSearch(e.target.value);
                            doSearch(e.target.value);
                        }}
                        value={search}
                    />
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
                                المعلم
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
                                <td className="border p-4 border-dark-500">
                                    {student.teacher}
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

            <div className='rounded-full bg-scolor-1000 w-12 h-12  p-1  text-white text-3xl flex justify-center align-center fixed bottom-10 left-10 cursor-pointer' onClick={openModal}><span>+</span></div>

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        maxWidth: '100%'
                    },
                }}
                contentLabel="Example Modal"

            >
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div className="relative flex justify-center text-sm leading-5">
                        <span className="px-2 font-bold bg-white ">
                            إضافة طالب
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="w-full space-y-6">
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="student-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder="الاسم"
                                    onChange={(e) => {
                                        setStudentName(e.target.value)
                                    }}
                                    value={studentName}

                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <label className='mb-2 inline-block'>المُعلِم</label>

                                <select id="teacher" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder="المُعلِم"
                                    onChange={(e) => {
                                        setTeacher(e.target.value)
                                    }}
                                    value={teacher}

                                >
                                    <option >
                                        إختر معلم
                                    </option>
                                    {teachers.map((item, i) => (
                                        <option key={i} >
                                            {item.name}
                                        </option>
                                    ))}

                                </select>
                            </div>
                        </div>

                        <div>
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="button" className="py-2 px-4  bg-mcolor-900 hover:bg-scolor-1000 focus:ring-mcolor-500 focus:ring-offset-mcolor-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    onClick={handleSubmitNewStudent}
                                >
                                    إضافة
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

            </Modal >

        </div>
    )
}

export default Index