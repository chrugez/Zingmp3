import React, { memo } from 'react'
import { List } from './';
import icons from '../ultis/icons'
import moment from 'moment';
import { useSelector } from 'react-redux';

const { BsDot } = icons

const Lists = ({ totalDuration, isHideTime }) => {
    // console.log({ songs, totalDuration });

    const { songs } = useSelector(state => state.music)

    return (
        <div className='w-full flex flex-col text-xs text-gray-600'>
            <div className='flex justify-between items-center uppercase p-[10px] font-semibold'>
                <span className={isHideTime ? 'font-bold text-lg' : ''}>Bài hát</span>
                {!isHideTime && <span>Album</span>}
                {!isHideTime && <span>Thời gian</span>}
            </div>
            <div className='flex flex-col'>
                {songs?.map(item => (
                    <List key={item.encodeId} songData={item} isHideNode />
                ))}
            </div>
            {totalDuration && <div className='flex items-center py-[10px] gap-1 border-t border-[rgba(0,0,0,0.05)]'>
                <span>{`${songs?.length} bài hát`}</span>
                <BsDot size={24} />
                <span>{moment.utc(totalDuration * 1000).format('HH:mm')}</span>
            </div>}
        </div>
    )
}

export default memo(Lists)