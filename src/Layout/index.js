import React from 'react'
import { Outlet } from 'react-router-dom'

function index() {
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

export default index