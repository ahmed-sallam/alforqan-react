import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from 'react-icons/ai'
import Modal from 'react-modal';
import { collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { db, auth } from '../firebase'
function Index() {


    // const { state, pathname } = useLocation();
    // // const { userType, uid } = state
    // const navigate = useNavigate()
    // const [user, setUSer] = useState(null)


    const [staff, setStaff] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [staffName, setStaffName] = useState("");
    const [staffJob, setStaffJob] = useState("");
    const [staffUserName, setStaffUserName] = useState("");
    const [password, setPassword] = useState("");


    const staffRef = collection(db, "staff");

    Modal.setAppElement('#root');

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        resetModalData();
    }
    const addStaff = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, staffUserName, password)
            const uid = userCredential.user.uid;
            const newStaff = {
                uid,
                name: staffName,
                job: staffJob,
                username: staffUserName,
                password
            }
            const docRef = await setDoc(doc(db, "staff", uid), newStaff);

            setStaff([...staff, newStaff]);
        } catch (error) {
            console.log("adding staff error", error);
        }
    }
    const resetModalData = () => {
        setStaffName("");
        setStaffJob("");
        setStaffUserName("");
        setPassword("");
    }
    const handleSubmitNewStaff = () => {
        addStaff();

        // add form validation
        // add loading icon
        // add auth info
        closeModal()

    }


    const fetchData = async () => {

        const staffDocs = await getDocs(staffRef);
        let staffData = []
        staffDocs.forEach(doc => {
            staffData.push({
                id: doc.id, ...doc.data()
            })
        })
        setStaff(staffData);

    }
    useEffect(() => {
        fetchData().catch(error => { console.log("Staff fetch data error", error); })
    }, [])

    // useEffect(() => {
    //     console.log("ccc", state);
    //     onAuthStateChanged(auth, async (user) => {
    //         if (user) {
    //             // setUSer(user)
    //             const uid = user.uid;
    //             const docRef = doc(db, "staff", uid)
    //             const docSnap = await getDoc(docRef);
    //             const data = docSnap.data()
    //             setUSer(data)

    //             if ((data.job == "مدير الدورة" || data.job == "المشرف التعليمي") && pathname == "/dash/staff") {
    //                 // navigate("/dash/staff", { state: data })
    //             } else {
    //                 navigate("/dash/students", { state: data })
    //             }

    //         } else {
    //             navigate("/login")
    //         }
    //     })
    // }, [])
    return (
        <div className='p-6 relative'>
            <h1 className='font-bold text-2xl mb-5'>فريق العمل</h1>
            <div >

                {staff.length > 0 ?
                    (<table className="table p-4 bg-white rounded-lg shadow w-auto max-w-full ">
                        <thead className='bg-mcolor-500'>
                            <tr>
                                <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                    #
                                </th>
                                <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                    الاسم
                                </th>
                                <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                    الوظيفة
                                </th>
                                <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                    اسم المستخدم
                                </th>
                                <th className="border p-4 border-dark-500 whitespace-nowrap font-normal text-gray-900">
                                    خيارات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                staff.map((item, i) => {
                                    return (
                                        <tr key={item.id + i} className="text-gray-700" >
                                            <td className="border p-4 border-dark-500">
                                                {i + 1}
                                            </td>
                                            <td className="border p-4 border-dark-500">
                                                {item.name}
                                            </td>
                                            <td className="border p-4 border-dark-500">
                                                {item.job}
                                            </td>
                                            <td className="border p-4 border-dark-500">
                                                {item.username}
                                            </td>
                                            <td className="border p-4 border-dark-500 text-xl">
                                                <AiTwotoneEdit className='m-auto text-scolor-1000' />
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>) :
                    <div>There are no data</div>}

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
                            إضافة عضو بالفريق
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="w-full space-y-6">
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="text" id="staff-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder="الاسم"
                                    onChange={(e) => {
                                        setStaffName(e.target.value)
                                    }}
                                    value={staffName}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <select id="staf-jop" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder="الوظيفة"

                                    onChange={(e) => {
                                        setStaffJob(e.target.value)
                                    }}
                                    value={staffJob}
                                >
                                    <option>
                                        إختر الوظيفة
                                    </option>
                                    <option>
                                        مدير الدورة
                                    </option>
                                    <option>
                                        المشرف التعليمي
                                    </option>
                                    <option>
                                        مُحَفِظ
                                    </option>
                                    <option>
                                        مُختَبِر
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="email" id="staff-username" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder=" الايميل"

                                    onChange={(e) => {
                                        setStaffUserName(e.target.value)
                                    }}
                                    value={staffUserName} />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className=" relative ">
                                <input type="password" id="password" className=" rounded-lg border-transparent flex-1 appearance-none border border-mcolor-400 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent" placeholder="كلمة المرور"

                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    value={password}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="block w-full rounded-md shadow-sm">
                                <button type="button" className="py-2 px-4  bg-mcolor-900 hover:bg-scolor-1000 focus:ring-mcolor-500 focus:ring-offset-mcolor-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={handleSubmitNewStaff}>
                                    إضافة
                                </button>
                            </span>
                        </div>
                    </div>
                </div>

            </Modal >
        </div >
    )
}

export default Index