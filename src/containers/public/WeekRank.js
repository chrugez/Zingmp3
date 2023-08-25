import React from 'react'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import bgChart from '../../assets/bg-chart.jpg'
import { RankList } from '../../components'

const notActiveStyle = 'text-[24px] text-black py-[12px] font-semibold uppercase'
const activeStyle = 'text-[24px] text-main-500 py-[12px] font-semibold border-b-2 border-[#0e8080] uppercase'

const WeekRank = ({ weekChart }) => {

    // console.log(weekChart);
    const { pid } = useParams()

    useEffect(() => {

    }, [pid])

    return (
        <div>
            <div className='relative'>
                <img src={bgChart} alt='bg-chart' className='w-full h-[500px] object-cover grayscale' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.8)]'></div>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-main-300 to-transparent'></div>
                <div className='absolute top-0 left-0 right-0 bottom-1/2 flex flex-col gap-4 px-[60px] '>
                    <h3 className='font-bold text-[40px] mt-[90px] text-main-500'>Bảng xếp hạng tuần</h3>
                    <div className='flex gap-8'>
                        {weekChart?.map(item => (
                            <NavLink
                                key={item.chartId}
                                to={item.link?.split('.')[0]}
                                className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                            >
                                {item.country === 'vn' ? 'Việt Nam' : item.country === 'us' ? 'US-UK' : item.country === 'korea' ? 'K-Pop' : ''}
                            </NavLink>
                        ))}
                    </div>
                    <div className='pb-8 w-full'>
                        <RankList
                            data={weekChart?.find(item => item?.link?.includes(pid)).items}
                            number={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeekRank