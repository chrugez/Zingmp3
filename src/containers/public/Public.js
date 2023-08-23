import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Player, SidebarLeft, SidebarRight, Header, Loading } from '../../components';
import { useSelector } from 'react-redux';

const Public = () => {
    const { isLoading } = useSelector(state => state.app)
    const [isShowRightSideBar, setIsShowRightSideBar] = useState(true)
    return (
        <div className='w-full relative h-screen flex flex-col bg-main-300'>
            <div className='w-full h-full flex flex-auto'>
                <div className='w-[240px] flex-none '>
                    <SidebarLeft />
                </div>
                <div className='flex-auto relative flex flex-col  '>
                    {isLoading && <div className='absolute top-0 left-0 right-0 bottom-0 z-20 bg-main-200 flex items-center justify-center'>
                        <Loading />
                    </div>}
                    <div className='h-[70px] fixed top-0 left-[240px] right-[329px] px-[59px] z-50 flex items-center'>
                        <Header />
                    </div>
                    <div className='flex-auto w-full'>
                        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                            <Outlet />
                        </Scrollbars>
                    </div>
                </div>
                {isShowRightSideBar && <div className='w-[329px] h-screen hidden 1500:flex flex-none animate-slide-left'>
                    <SidebarRight />
                </div>}
            </div>
            <div className='fixed z-30 bottom-0 left-0 right-0 flex-none h-[90px]'>
                <Player setIsShowRightSideBar={setIsShowRightSideBar} />
            </div>
        </div>
    )
}

export default Public