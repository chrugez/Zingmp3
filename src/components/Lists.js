import React, { memo } from 'react'
import { List } from './';
import icons from '../ultis/icons'
import moment from 'moment';

const { BsDot } = icons

const Lists = ({ songs, totalDuration }) => {
    // console.log({ songs, totalDuration });
    return (
        <div className='w-full flex flex-col text-xs text-gray-600'>
            <div className='flex justify-between items-center uppercase p-[10px] font-semibold'>
                <span>Bài hát</span>
                <span>Album</span>
                <span>Thời gian</span>
            </div>
            <div className='flex flex-col'>
                {songs?.map(item => (
                    <List key={item.encodeId} songData={item} />
                ))}
            </div>
            <div className='flex items-center py-[10px] gap-1 border-t border-[rgba(0,0,0,0.05)]'>
                <span>{`${songs?.length} bài hát`}</span>
                <BsDot size={24} />
                <span>{moment.utc(totalDuration * 1000).format('HH:mm')}</span>
            </div>
        </div>
    )
}

export default memo(Lists)