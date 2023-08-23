import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { searchMenu } from '../../ultis/menu'
import { useSelector } from 'react-redux'

const notActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer'
const ActiveStyle = 'px-4 hover:text-main-500 font-semibold cursor-pointer border-b-2 border-green-900 text-main-500 h-[52px] flex items-center'

const Search = () => {

    const { keyword } = useSelector(state => state.music)

    return (
        <div>
            <div className='flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pl-[60px] pb-1 '>
                <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả tìm kiếm</span>
                <div className='flex items-center uppercase'>
                    {searchMenu.map(item => (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keyword.replace('+', ' ')}`}
                            className={({ isActive }) => isActive ? ActiveStyle : notActiveStyle}
                        >
                            {item.text}
                        </NavLink>
                    ))}

                </div>
            </div>
            <div>
                <Outlet />
            </div>
            <div className='h-[120px]'></div>
        </div>
    )
}

export default Search