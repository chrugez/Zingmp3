import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
    return (
        <div>
            <div className='flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1 '>
                <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
                <div className='flex items-center uppercase'>
                    <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Tất cả</span>
                    <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Bài hát</span>
                    <span className='px-4 hover:text-main-500 font-semibold cursor-pointer '>Playlist/Album</span>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Search