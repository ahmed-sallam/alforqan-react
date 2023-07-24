import React, { useState, useEffect } from 'react'
import { AiTwotoneEdit, AiOutlineEye } from 'react-icons/ai'
import Modal from 'react-modal'
import { collection, query, getDocs, doc, getDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'

function Index() {
    const { state } = useLocation();
    // const { userType, uid } = state


    const [modalIsOpen, setIsOpen] = useState(false);
    const [resultModal, setResultModal] = useState(false);
    const [resultModalData, setResultModalData] = useState({});
    const [student, setStudent] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [part, setPart] = useState(0);
    const [q1, setQ1] = useState(25);
    const [q2, setQ2] = useState(25);
    const [q3, setQ3] = useState(25);
    const [q4, setQ4] = useState(0);
    const [date, setDate] = useState("");
    const [teacher, setTeacher] = useState("");

    const [q1m, setQ1m] = useState(new Array(6).fill(false));
    const [q1mv, setQ1mv] = useState(0);
    const [q1l, setQ1l] = useState(new Array(6).fill(false));
    const [q1lv, setQ1lv] = useState(0);
    const [q1j, setQ1j] = useState(new Array(6).fill(false));
    const [q1jv, setQ1jv] = useState(0);
    const [q2m, setQ2m] = useState(new Array(6).fill(false));
    const [q2mv, setQ2mv] = useState(0);
    const [q2l, setQ2l] = useState(new Array(6).fill(false));
    const [q2lv, setQ2lv] = useState(0);
    const [q2j, setQ2j] = useState(new Array(6).fill(false));
    const [q2jv, setQ2jv] = useState(0);
    const [q3m, setQ3m] = useState(new Array(6).fill(false));
    const [q3mv, setQ3mv] = useState(0);
    const [q3l, setQ3l] = useState(new Array(6).fill(false));
    const [q3lv, setQ3lv] = useState(0);
    const [q3j, setQ3j] = useState(new Array(6).fill(false));
    const [q3jv, setQ3jv] = useState(0);



    Modal.setAppElement('#root');
    let { id } = useParams();

    const handleOnchangeQ1m = (i) => {
        const updatedQ1m = q1m.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ1mv = updatedQ1m.filter(item => item).length
        const updatedQ1 = updatedQ1mv > q1mv ? q1 - 1 > 0 ? q1 - 1 : 0 : q1 + 1
        setQ1m(updatedQ1m);
        setQ1mv(updatedQ1mv);
        setQ1(updatedQ1)
    }
    const handleOnchangeQ1l = (i) => {
        const updatedQ1l = q1l.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ1lv = updatedQ1l.filter(item => item).length
        const updatedQ1 = updatedQ1lv > q1lv ? q1 - 2 > 0 ? q1 - 2 : 0 : q1 + 2
        setQ1l(updatedQ1l);
        setQ1lv(updatedQ1lv);
        setQ1(updatedQ1)
    }
    const handleOnchangeQ1j = (i) => {
        const updatedQ1j = q1j.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ1jv = updatedQ1j.filter(item => item).length
        const updatedQ1 = updatedQ1jv > q1jv ? q1 - 3 > 0 ? q1 - 3 : 0 : q1 + 3
        setQ1j(updatedQ1j);
        setQ1jv(updatedQ1jv);
        setQ1(updatedQ1)

    }
    const handleOnchangeQ2m = (i) => {
        const updatedQ2m = q2m.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ2mv = updatedQ2m.filter(item => item).length
        const updatedQ2 = updatedQ2mv > q2mv ? q2 - 1 > 0 ? q2 - 1 : 0 : q2 + 1
        setQ2m(updatedQ2m);
        setQ2mv(updatedQ2mv);
        setQ2(updatedQ2)
    }
    const handleOnchangeQ2l = (i) => {
        const updatedQ2l = q2l.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ2lv = updatedQ2l.filter(item => item).length
        const updatedQ2 = updatedQ2lv > q2lv ? q2 - 2 > 0 ? q2 - 2 : 0 : q2 + 2
        setQ2l(updatedQ2l);
        setQ2lv(updatedQ2lv);
        setQ2(updatedQ2)
    }
    const handleOnchangeQ2j = (i) => {
        const updatedQ2j = q2j.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ2jv = updatedQ2j.filter(item => item).length
        const updatedQ2 = updatedQ2jv > q2jv ? q2 - 3 > 0 ? q2 - 3 : 0 : q2 + 3
        setQ2j(updatedQ2j);
        setQ2jv(updatedQ2jv);
        setQ2(updatedQ2)
    }
    const handleOnchangeQ3m = (i) => {
        const updatedQ3m = q3m.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ3mv = updatedQ3m.filter(item => item).length
        const updatedQ3 = updatedQ3mv > q3mv ? q3 - 1 > 0 ? q3 - 1 : 0 : q3 + 1
        setQ3m(updatedQ3m);
        setQ3mv(updatedQ3mv);
        setQ3(updatedQ3)
    }
    const handleOnchangeQ3l = (i) => {
        const updatedQ3l = q3l.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ3lv = updatedQ3l.filter(item => item).length
        const updatedQ3 = updatedQ3lv > q3lv ? q3 - 2 > 0 ? q3 - 2 : 0 : q3 + 2
        setQ3l(updatedQ3l);
        setQ3lv(updatedQ3lv);
        setQ3(updatedQ3)
    }
    const handleOnchangeQ3j = (i) => {
        const updatedQ3j = q3j.map((item, index) =>
            index == i ? !item : item
        )
        const updatedQ3jv = updatedQ3j.filter(item => item).length
        const updatedQ3 = updatedQ3jv > q3jv ? q3 - 3 >= 0 ? q3 - 3 : 0 : q3 + 3
        setQ3j(updatedQ3j);
        setQ3jv(updatedQ3jv);
        setQ3(updatedQ3)
    }


    const fetchData = async () => {
        try {
            const teachersRef = collection(db, "staff");
            const teachersQuery = query(teachersRef, where("job", "==", "مُختَبِر"));
            const teachersSnap = await getDocs(teachersQuery);
            let teachersData = []
            teachersSnap.forEach(doc => {
                teachersData.push({
                    id: doc.id, ...doc.data()
                })
            })
            setTeachers(teachersData);

            const docRef = doc(db, "students", id)
            const docSnap = await getDoc(docRef);
            const data = docSnap.data()
            const sortedExams = data.exams.sort((a, b) => a.part - b.part)
            setStudent({ ...data, sortedExams })
            console.log("doc data", docSnap.data());
        } catch (error) {
            console.log("Student fetch data error", error);
        }


    }

    useEffect(() => {
        fetchData()
        console.log("ttt", state);

    }, [modalIsOpen])

    const updateStudent = async () => {
        const docRef = doc(db, "students", id)
        const filteredExams = student.exams.filter((exam) => exam.part !== part)
        const newExam = {
            part,
            q1: {
                m: q1mv,
                l: q1lv,
                j: q1jv,
                total: q1
            },
            q2: {
                m: q2mv,
                l: q2lv,
                j: q2jv,
                total: q2
            },
            q3: {
                m: q3mv,
                l: q3lv,
                j: q3jv,
                total: q3
            },
            q4,
            subTotal: q1 + q2 + q3 + q4,
            date,
            teacher: state.name, // this if just the login user whose will make the exam

        }

        const newAverage = newExam.subTotal >= 60 ? (student.average == 0 ?
            newExam.subTotal :
            (student.average + newExam.subTotal) / 2) : student.average

        const newRate = newAverage >= 90 ? "ممتاز" :
            (newAverage >= 80 ? "جيد جدا" :
                (newAverage >= 70 ? "جيد" :
                    (newAverage >= 60 ? "مقبول" : "راسب")
                )
            )

        const newTotalParts = newExam.subTotal >= 60 ? student.totalParts + 1 : student.totalParts
        console.log("ssss ", {
            exams: [...filteredExams, newExam],
            total: student.total + newExam.subTotal,
            average: newAverage,
            rate: newRate,
            totalParts: newTotalParts
        });
        await updateDoc(docRef, {
            exams: [...filteredExams, newExam],
            total: student.total + newExam.subTotal,
            average: newAverage,
            rate: newRate,
            totalParts: newTotalParts
        })
    }
    function formatAsPercentage(num) {
        return new Intl.NumberFormat('default', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num / 100);
    }

    function openResultModal(i) {
        setResultModalData(i)
        setResultModal(true)

        console.log("rrrrresults ", resultModalData);
    }
    function openModal(i) {
        if (i.subTotal >= 60 || state.job != "مُختَبِر") {
            setIsOpen(false);
        } else {

            setIsOpen(true);
            setPart(i.part)

        }


    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeResultModal() {
        setResultModal(false);
    }
    function closeModal() {
        setIsOpen(false);
        resetModalData()
    }
    const resetModalData = () => {
        setPart(0);
        setPart(0);
        setQ1(25)
        setQ2(25)
        setQ3(25)
        setQ4(0)
        setDate("")
        setTeacher("")
        setQ1m(new Array(6).fill(false))
        setQ1l(new Array(6).fill(false))
        setQ1j(new Array(6).fill(false))
        setQ2m(new Array(6).fill(false))
        setQ2l(new Array(6).fill(false))
        setQ2j(new Array(6).fill(false))
        setQ3m(new Array(6).fill(false))
        setQ3l(new Array(6).fill(false))
        setQ3j(new Array(6).fill(false))
        setQ1mv(0)
        setQ1lv(0)
        setQ1jv(0)
        setQ2mv(0)
        setQ2lv(0)
        setQ2jv(0)
        setQ3mv(0)
        setQ3lv(0)
        setQ3jv(0)

    }

    const handleSubmitUpdateExam = async () => {
        if (state?.job == "مُختَبِر") {
            await updateStudent();
        }

        // add form validation
        // add loading icon
        // add auth info
        closeModal()

    }


    return (

        <div className='p-6 relative '>
            <div className='flex flex-row  justify-between aitems-center   max-w-full mb-5 bg-white p-4 rounded-md' style={{ width: "900px", alignItems: "center" }}>
                <div className='flex flex-row ' style={{ alignItems: "center" }}>
                    <div className='p-6 h-20 w-20 rounded-full bg-mcolor-600 font-extrabold text-center text-2xl'>{id}</div>
                    <div className='flex flex-col mx-4'>
                        <h1 className='font-extrabold text-3xl'>{student.name}</h1>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row justify-between p-2 '><p className='ml-4 font-bold' >عدد الاجزاء</p> <span>{student.totalParts}</span></div>
                            <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold'>المعدل</p> <span>{formatAsPercentage(student.average)}</span></div>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold' >المجموع</p> <span>{student.total}</span></div>
                            <div className='flex flex-row justify-between p-2  '><p className='ml-4 font-bold'>التقدير</p> <span>{student.rate}</span></div>
                        </div>
                    </div>
                </div>
                <h2 className='font-extrabold'>المعلم / {student.teacher}</h2>
            </div>
            <div className="overflow-y-scroll" style={{ height: "calc(100vh - 300px)" }}>

                <table className="table p-4 bg-white rounded-lg shadow w-auto   max-w-full">
                    <thead className='bg-mcolor-500'>
                        <tr>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                الجزء
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900 w-28">
                                س1
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900 w-28">
                                س2
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900 w-28">
                                س3
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900 w-28">
                                س4 / الاداء
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900 w-28">
                                المجموع
                            </th>
                            <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                التاريخ
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
                        {student.exams?.length > 0 && student.exams.map((item, i) => (
                            <tr className="text-gray-700" key={i}>
                                <td className="border p-4 border-dark-500">
                                    {item.part}
                                </td>
                                <td className="border p-4 border-dark-500 w-28 text-center">
                                    {item.q1.total}
                                </td>
                                <td className="border p-4 border-dark-500 w-28  text-center">
                                    {item.q2.total}
                                </td>
                                <td className="border p-4 border-dark-500 w-28  text-center">
                                    {item.q3.total}
                                </td>
                                <td className="border p-4 border-dark-500 w-28  text-center">
                                    {item.q4}
                                </td>
                                <td className="border p-4 border-dark-500 w-28  text-center">
                                    {item.subTotal}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {item.date}
                                </td>
                                <td className="border p-4 border-dark-500">
                                    {item.teacher}
                                </td>
                                <td className="border p-4 border-dark-500 text-xl flex">
                                    <AiTwotoneEdit className='m-auto text-scolor-1000 m-2' onClick={() => openModal(item)} />
                                    <AiOutlineEye className='m-auto text-scolor-1000 m-2' onClick={() => openResultModal(item)} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
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
                            إختبار الجزء {part}
                        </span>
                    </div>
                </div>
                {/* <div>

                </div> */}
                <div className="mt-6">
                    {state?.job == "مُختَبِر" ?
                        (<div className="w-full space-y-6">


                            <div className="w-full  flex flex-row border-b pb-2 justify-between">
                                <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                    س1
                                </div>
                                    <div className="flex flex-col">
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>خطأ</h3>
                                            <div>
                                                {q1m.map((item, i) => <input type='checkbox' className='m-2' value={q1m[i]} onChange={() => handleOnchangeQ1m(i)} />
                                                )}

                                            </div>

                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن خفي</h3>
                                            <div>
                                                {q1l.map((item, i) => <input type='checkbox' className='m-2' value={q1l[i]} onChange={() => handleOnchangeQ1l(i)} />
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن جلي</h3>
                                            <div>
                                                {q1j.map((item, i) => <input type='checkbox' className='m-2' value={q1j[i]} onChange={() => handleOnchangeQ1j(i)} />
                                                )}
                                            </div>
                                        </div>
                                    </div></div>
                                <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{q1}</div>
                            </div>
                            <div className="w-full  flex flex-row border-b pb-2 justify-between">
                                <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                    س2
                                </div>
                                    <div className="flex flex-col">
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>خطأ</h3>
                                            <div>
                                                {q2m.map((item, i) => <input type='checkbox' className='m-2' value={q2m[i]} onChange={() => handleOnchangeQ2m(i)} />
                                                )}

                                            </div>

                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن خفي</h3>
                                            <div>
                                                {q2l.map((item, i) => <input type='checkbox' className='m-2' value={q2l[i]} onChange={() => handleOnchangeQ2l(i)} />
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن جلي</h3>
                                            <div>
                                                {q2j.map((item, i) => <input type='checkbox' className='m-2' value={q2j[i]} onChange={() => handleOnchangeQ2j(i)} />
                                                )}
                                            </div>
                                        </div>
                                    </div></div>
                                <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{q2}</div>
                            </div>
                            <div className="w-full  flex flex-row border-b pb-2 justify-between">
                                <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                    س3
                                </div>
                                    <div className="flex flex-col">
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>خطأ</h3>
                                            <div>
                                                {q3m.map((item, i) => <input type='checkbox' key={i} className='m-2' value={q3m[i]} onChange={() => handleOnchangeQ3m(i)} />
                                                )}

                                            </div>

                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن خفي</h3>
                                            <div>
                                                {q3l.map((item, i) => <input type='checkbox' key={i} className='m-2' value={q3l[i]} onChange={() => handleOnchangeQ3l(i)} />
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex flex-row'>
                                            <h3 className='w-20'>لحن جلي</h3>
                                            <div>
                                                {q3j.map((item, i) => <input type='checkbox' key={i} className='m-2' value={q3j[i]} onChange={() => handleOnchangeQ3j(i)} />
                                                )}
                                            </div>
                                        </div>
                                    </div></div>
                                <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{q3}</div>
                            </div>


                            <div className=" relative w-full flex flex-row justify-center items-center">
                                <h3 className='ml-4 font-bold'>الاداء</h3>
                                <input type="number" max='25' id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="الاداء" value={q4} onChange={(e) => {
                                    setQ4(Number(e.target.value));
                                }} />
                            </div>


                            <div className=" relative w-full flex flex-row justify-center items-center">
                                <h3 className='ml-4 font-bold'>التاريخ</h3>
                                <input type="date" max='25' id="date" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="التاريخ" value={date} onChange={(e) => {
                                    setDate(e.target.value);
                                }} />
                            </div>

                            <div className=" relative w-full flex flex-row justify-center items-center">
                                <h3 className='ml-4 font-bold'>المُختَبِر</h3>
                                <select max='25' id="teacher" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="المُختَبِر" value={teacher} onChange={(e) => {
                                    setTeacher(e.target.value);
                                }} >
                                    <option>
                                        {state?.job == "مُختَبِر" ? state.name : "لا يمكنك إجراء الاختبار"}
                                    </option>



                                </select>
                            </div>


                            <div>
                                <span className="block w-full rounded-md shadow-sm">
                                    <button type="button" className="py-2 px-4  bg-mcolor-900 hover:bg-scolor-1000 focus:ring-mcolor-500 focus:ring-offset-mcolor-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={handleSubmitUpdateExam}>
                                        إضافة
                                    </button>
                                </span>
                            </div>
                        </div>)
                        : <div className='text-center'>لا يمكنك إجراء الاختبار</div>}

                </div>

            </Modal >
            <Modal
                isOpen={resultModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeResultModal}
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
            // contentLabel="Example Modal"

            >
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300">
                        </div>
                    </div>
                    <div className="relative flex justify-center text-sm leading-5">
                        <span className="px-2 font-bold bg-white ">
                            نتيجة إختبار الجزء {resultModalData.part}
                        </span>
                    </div>
                </div>
                {/* <div>

                </div> */}
                <div className="mt-6">
                    <div className="w-full space-y-6">


                        <div className="w-full  flex flex-row border-b pb-2 justify-between">
                            <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                س1
                            </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>خطأ</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q1?.m ? true : false} />
                                            )}

                                        </div>

                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن خفي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q1?.l ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن جلي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q1?.j ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                </div></div>
                            <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{resultModalData.q1?.total}</div>
                        </div>
                        <div className="w-full  flex flex-row border-b pb-2 justify-between">
                            <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                س2
                            </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>خطأ</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q2?.m ? true : false} />
                                            )}

                                        </div>

                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن خفي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q2?.l ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن جلي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q2?.j ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                </div></div>
                            <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{resultModalData.q2?.total}</div>
                        </div>
                        <div className="w-full  flex flex-row border-b pb-2 justify-between">
                            <div className="flex flex-row justify-start">   <div className="p-6 font-extrabold w-20">
                                س3
                            </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>خطأ</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q3?.m ? true : false} />
                                            )}

                                        </div>

                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن خفي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q3?.l ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <h3 className='w-20'>لحن جلي</h3>
                                        <div>
                                            {[1, 2, 3, 4, 5, 6].map((item, i) =>
                                                <input type='checkbox' disabled={true} className='m-2' checked={i + 1 <= resultModalData.q3?.j ? true : false} />
                                            )}
                                        </div>
                                    </div>
                                </div></div>
                            <div className='p-4 font-extrabold rounded border-2 flex items-center justify-center'>{resultModalData.q3?.total}</div>
                        </div>


                        <div className=" relative w-full flex flex-row justify-center items-center">
                            <h3 className='ml-4 font-bold'>الاداء</h3>
                            <input type="number" disabled={true} max='25' id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="الاداء" value={resultModalData.q4} />
                        </div>


                        <div className=" relative w-full flex flex-row justify-center items-center">
                            <h3 className='ml-4 font-bold'>التاريخ</h3>
                            <input type="date" disabled={true} max='25' id="date" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="التاريخ" value={resultModalData.date} />
                        </div>

                        <div className=" relative w-full flex flex-row justify-center items-center">
                            <h3 className='ml-4 font-bold'>المُختَبِر</h3>

                            <select disabled={true} max='25' id="teacher" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-mcolor-600 focus:border-transparent" placeholder="المُختَبِر" value={resultModalData.teacher}  >
                                <option>
                                    {resultModalData.teacher}
                                </option>

                            </select>
                        </div>

                    </div>

                    <div>
                        <span className="block w-full rounded-md shadow-sm">
                            <button type="button" disabled className="py-2 px-4 mt-2  bg-mcolor-900 hover:bg-scolor-1000 focus:ring-mcolor-500 focus:ring-offset-mcolor-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " >
                                {resultModalData.subTotal}
                            </button>
                        </span>
                    </div>
                </div>

            </Modal >
        </div>
    )
}

export default Index