import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
function Index() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUSer] = useState(null)

    const handleLogin = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;

                const docRef = doc(db, "staff", uid)
                const docSnap = await getDoc(docRef);
                const data = docSnap.data()
                setUSer(data)

                if (data.job == "مدير الدورة" || data.job == "المشرف التعليمي") {
                    navigate("/dash/staff", { state: data })
                } else {
                    navigate("/dash/students", { state: data })
                }

                // navigate(toPath, { state: { userType, uid } })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    // const getStaffInfo = async (uid) => {
    //     const docRef = doc(db, "staff", uid)
    //     const docSnap = await getDoc(docRef);
    //     const data = docSnap.data()
    //     return data;
    // }


    useEffect(() => {
        console.log("start auth");
        try {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    const docRef = doc(db, "staff", uid)
                    const docSnap = await getDoc(docRef);
                    const data = docSnap.data()
                    setUSer(data)
                    // navigate("/dash/staff", { state: data })

                    // if (data.job == "مدير الدورة" || data.job == "المشرف التعليمي") {
                    //     navigate("/dash/staff", { state: data })
                    // } else {
                    //     navigate("/dash/students", { state: data })
                    // }
                    // navigate(toPath, { state: { userType, uid } })
                } else {
                    navigate("/login")
                }
            })
        } catch (error) {
            navigate("/login")
        }

        console.log("end auth");


    }, [])


    return (
        <div className='flex flex-col h-screen justify-center  items-center '>

            <div className='lg:w-2/4 md:w-3/4 ms:w-full flex flex-row  p-10 rounded-lg shadow-md ' style={{ backgroundColor: 'white' }}>
                <div className='flex-1 ml-3 flex-col justify-center align-center flex'>
                    <h1 className='text-2xl font-extrabold text-center mb-6'>تسجيل الدخول</h1>
                    <input className='rounded bg-mcolor-300 w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent' type='email' placeholder='الايميل'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        value={email}
                    />
                    <input className='rounded bg-mcolor-300 w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-scolor-900 focus:border-transparent' type='password' placeholder='كلمة المرور'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                    <button className='rounded bg-scolor-1000 w-full  p-2 my-2' style={{ color: 'white' }}
                        onClick={handleLogin}
                    >دخول</button>
                </div>
                <div className='flex-1 mr-3'>
                    <img src='https://www.comqt.sa/wp-content/uploads/2013/09/cropped-logo2016-1.png' />
                </div>
            </div>
        </div>
    )
}

export default Index