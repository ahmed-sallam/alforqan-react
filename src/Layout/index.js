import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
function Index() {
    const navigate = useNavigate();
    const [user, setUSer] = useState(null)
    const { pathname, state } = useLocation();

    const handleNavigate = (path) => {
        navigate(path, { state: user });
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
                navigate(pathname != "/login" ? pathname : "/dash", { state: data })

                // if ((data.job == "مدير الدورة" || data.job == "المشرف التعليمي") && pathname == "/dash/staff") {
                //     navigate(pathname, { state: data })
                // } else {
                //     console.log("pp", pathname);
                //     navigate(pathname != "/dash/staff" ? pathname : "/dash/students", { state: data })
                // }

            } else {
                navigate("/login")
            }
        })
    }, [pathname])
    return (
        <div className='h-screen w-screen bg-mcolor-150  relative'>
            <div className='w-full bg-mcolor-1000 flex justify-center align-center p-3 flex-0 sticky inset-0'>
                <div className='p-2 rounded' style={{ backgroundColor: "white" }}>جمعية فرقان لتحفيظ القرآن الكريم بالطائف</div>
            </div>
            <div className=' flex-1 ' style={{ height: "calc(100vh - 64px)" }}>
                <Outlet />
            </div>
            <div className='flex flex-0 justify-start align-center p-3 fixed right-72 bottom-0'>
                <div className='p-2 rounded' >دورة الشيخ علي بن محمل العتيبي المكثفة الصيفية 23 لعام 1444 هـ</div>
            </div>
        </div>
    )
}

export default Index