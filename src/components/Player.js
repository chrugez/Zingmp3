import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import moment from 'moment'

const { AiOutlineHeart, BiDotsHorizontalRounded, MdSkipNext, MdSkipPrevious, CiRepeat, PiShuffleLight, BiPlay, BiPause } = icons

let intervalId

const Player = () => {

    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [curSeconds, setCurSeconds] = useState(0)
    const dispatch = useDispatch()
    const [audio, setAudio] = useState(new Audio())
    const thumbRef = useRef()


    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            //console.log(response);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))

            }
        }

        fetchDetailSong()

    }, [curSongId])

    useEffect(() => {

        if (isPlaying) {
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSeconds(Math.round(audio.currentTime))
            }, 200)
        } else {
            intervalId && clearInterval(intervalId)
        }
    }, [isPlaying])


    useEffect(() => {
        audio.load()
        if (isPlaying) audio.play()
    }, [audio])

    const handleTogglePlay = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    return (
        <div className='bg-main-400 px-5 h-full flex'>
            <div className='w-[30%] flex-auto flex items-center gap-3'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BiDotsHorizontalRounded size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex items-center justify-center gap-2 flex-col border border-red-500 py-2'>
                <div className='flex gap-8 items-center justify-center'>
                    <span title='Bật phát ngẫu nhiên' className='cursor-pointer'>
                        <PiShuffleLight size={24} />
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span
                        className='p-1 border border-gray-700 rounded-full hover:text-main-500 cursor-pointer'
                        onClick={handleTogglePlay}
                    >
                        {isPlaying ? <BiPause size={30} /> : <BiPlay size={30} />}
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span title='Bật phát lại tất cả' className='cursor-pointer'>
                        <CiRepeat size={24} />
                    </span>
                </div>
                <div className='w-full flex items-center justify-center gap-3 text-xs' >
                    <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div className='w-3/4 h-[3px] bg-[rgba(0,0,0,0.1)] relative rounded-l-full rounded-r-full'>
                        <div ref={thumbRef} className='absolute top-0 left-0 h-[3px] bg-main-500 rounded-l-full rounded-r-full'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>
                volume
            </div>
        </div>
    )
}

export default Player