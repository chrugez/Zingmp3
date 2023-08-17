import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import { useEffect } from 'react'

const NewRelease = () => {
    const { newRelease } = useSelector(state => state.app)
    const [isActived, setIsActived] = useState(0)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (isActived === 0)
            setSongs(newRelease?.items?.all)
        else if (isActived === 1)
            setSongs(newRelease?.items?.vPop)
        else
            setSongs(newRelease?.items?.others)
    }, [isActived, newRelease])
    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
                <span className='text-xs uppercase'>
                    Tất cả
                </span>
            </div>
            <div className='flex items-center gap-5 text-xs'>
                <button
                    type='button'
                    onClick={() => setIsActived(0)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full uppercase border border-gray-400 ${isActived === 0 && 'bg-main-500 text-white'}`}
                >
                    Tất Cả
                </button>
                <button
                    type='button'
                    onClick={() => setIsActived(1)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full uppercase border border-gray-400 ${isActived === 1 && 'bg-main-500 text-white'}`}
                >
                    Việt Nam
                </button>
                <button
                    type='button'
                    onClick={() => setIsActived(2)}
                    className={`py-1 px-4 rounded-l-full rounded-r-full uppercase border border-gray-400 ${isActived === 2 && 'bg-main-500 text-white'}`}
                >
                    Quốc Tế
                </button>
            </div>
            <div className='flex flex-wrap w-full gap-3'>
                {newRelease?.items?.all?.filter((item, index) => index < 12)?.map(item => (
                    <div className='w-[45%] min-[1024px]:w-[30%]' key={item.encodeId}>
                        <SongItem

                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default memo(NewRelease)