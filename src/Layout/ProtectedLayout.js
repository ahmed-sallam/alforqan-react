import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineTeam } from 'react-icons/ai'
import { PiStudentBold } from 'react-icons/pi'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function ProtectedLayout
    () {
    const navigate = useNavigate();
    // const loc = useLocation();
    const { pathname, state } = useLocation();
    // const { userType, uid } = state
    const [user, setUSer] = useState(null)

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        });
    }

    const handleNavigate = (path) => {
        navigate(path)
        // navigate(path, { state: { userType, uid } })
    }


    useEffect(() => {
        console.log("ccc", state);
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // setUSer(user)
                const uid = user.uid;
                const docRef = doc(db, "staff", uid)
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()
                setUSer(data)

                if ((data.job == "مدير الدورة" || data.job == "المشرف التعليمي") && pathname == "/dash/staff") {
                    navigate(pathname, { state: data })
                } else {
                    console.log("pp", pathname);
                    navigate(pathname != "/dash/staff" ? pathname : "/dash/students", { state: data })
                }

            } else {
                navigate("/login")
            }
        })
    }, [pathname])

    useEffect(() => {

        if ((user?.job == "مدير الدورة" || user?.job == "المشرف التعليمي")) {
            navigate("/dash/staff", { state: user })
        } else {
            navigate("/dash/students", { state: user })
        }


    }, [])
    return (
        <div className='flex flex-row w-full  ' style={{ height: "calc(100vh - 64px)" }}>
            <div className='flex flex-col justify-between w-72 h-full shadow-xl px-3 py-5' style={{ backgroundColor: "white" }} >
                <div className='mt-5'>
                    <div className='my-3 p-2 hover:bg-mcolor-500 rounded w-full flex flex-row align-center'>
                        <AiOutlineTeam className='text-2xl ml-2 font-bold text-scolor-1000' />
                        <div className='w-full cursor-pointer' onClick={() => handleNavigate('/dash/staff')}>
                            فريق العمل
                        </div>
                    </div>
                    <div className='my-3 p-2 hover:bg-mcolor-500 rounded w-full flex flex-row'>
                        <PiStudentBold className='text-2xl ml-2 font-bold text-scolor-1000' />

                        <div className='w-full cursor-pointer' onClick={() => handleNavigate('/dash/students')}>
                            الطلاب
                        </div>
                    </div>

                    <button className='bg-white border-2 border-mcolor-1000 w-full p-2 mt-16 rounded hover:bg-mcolor-1000 hover:text-white text-mcolor-1000'
                        onClick={handleLogout}
                    >تسجيل الخروج</button>
                </div>
                <div>
                    <h4>مدير الدورة/<br /> أ.عبدالله فقيرة</h4>
                    <br />
                    <h4>المشرف التعليمي/ <br /> د/حسن الحلواتي</h4>
                </div>
            </div>

            <div className='flex flex-col justify-space-between h-full w-full' >
                <Outlet />
            </div>
        </div>
    )
}

export default ProtectedLayout
