import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AiOutlineTeam } from 'react-icons/ai'
import { PiStudentBold } from 'react-icons/pi'
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

function ProtectedLayout
    () {
    const navigate = useNavigate();
    // const [user, setUSer] = useState(null)

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        });
    }

    const handleNavigate = (path) => {
        navigate(path)
    }

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
