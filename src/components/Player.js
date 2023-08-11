import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'

const { AiOutlineHeart, BiDotsHorizontalRounded, MdSkipNext, MdSkipPrevious, CiRepeat, PiShuffleLight, BiPlay, BiPause } = icons

const Player = () => {
    const audioEl = useRef(new Audio())
    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [source, setSource] = useState(null)
    const dispatch = useDispatch()
    // const [isPlaying, setIsPlaying] = useState(false)
    // console.log(audioEl);


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
                setSource(res2.data.data['128'])

            }
        }

        fetchDetailSong()

    }, [curSongId])

    console.log(source);

    useEffect(() => {
        audioEl.current.pause()
        audioEl.current.src = source
        audioEl.current.load()
        if (isPlaying) audioEl.current.play()
    }, [curSongId, source])

    const handleTogglePlay = () => {
        if (isPlaying) {
            audioEl.current.pause()
            dispatch(actions.play(false))
        } else {
            audioEl.current.play()
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
                <div>
                    progressBar
                </div>
            </div>
            <div className='w-[30%] flex-auto border border-red-500'>
                volume
            </div>
        </div>
    )
}

export default Player