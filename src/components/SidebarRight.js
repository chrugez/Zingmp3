import React, { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import { apiGetDetailPlaylist } from '../apis'
import { Scrollbars } from 'react-custom-scrollbars-2'


const { RiDeleteBin5Line } = icons

const SidebarRight = () => {

    const [isRecent, setIsRecent] = useState(false)
    const [playlist, setPlaylist] = useState()
    const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)
    // console.log(curSongData);
    const fetchDetailPlaylist = async () => {
        const response = await apiGetDetailPlaylist(curAlbumId)
        if (response.data?.err === 0) setPlaylist(response.data?.data?.song?.items)
    }

    useEffect(() => {
        curAlbumId && fetchDetailPlaylist()
    }, [])

    useEffect(() => {
        if (curAlbumId && isPlaying) fetchDetailPlaylist()
    }, [curAlbumId, isPlaying])

    useEffect(() => {
        isPlaying && setIsRecent(false)
    }, [isPlaying, curSongId])
    console.log(recentSongs);

    return (
        <div className='flex flex-col text-xs w-full h-full'>
            <div className='h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'>
                <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[5px] ${!isRecent && 'bg-main-100'} flex-1 flex items-center justify-center rounded-l-full rounded-r-full`}
                    >
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent(prev => !prev)}
                        className={`py-[5px] ${isRecent && 'bg-main-100'} flex-1 flex items-center justify-center rounded-l-full rounded-r-full`}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span className='p-2 rounded-full hover:bg-main-100 cursor-pointer'>
                    <RiDeleteBin5Line size={16} />
                </span>
            </div>
            {isRecent
                // ? <div className='w-full flex flex-auto flex-col px-3 '>
                //     <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                //         {recentSongs && <div className='flex flex-col'>
                //             {recentSongs?.map(item => (
                //                 <div key={item.sid} className='py-1 '>
                //                     <SongItem
                //                         thumbnail={item?.thumbnail}
                //                         title={item?.title}
                //                         artists={item?.artists?.length < 2 ? item?.artists?.map(data => data.name) : `${item?.artists?.map(data => {
                //                             let artistsNames = []
                //                             artistsNames.push(data?.name)
                //                             return artistsNames.join(', ')
                //                         })}`
                //                         }
                //                         sid={item?.sid}
                //                         size={'w-[40px] h-[40px]'}
                //                     />
                //                 </div>
                //             ))}
                //         </div>}
                //     </Scrollbars>
                // </div>
                ? <div className='w-full flex flex-auto flex-col px-3 '>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {recentSongs && <div className='flex flex-col'>
                            {recentSongs?.map(item => (
                                <div key={item.sid} className='py-1 '>
                                    <SongItem
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artists?.map(data => data.name)}
                                        sid={item?.sid}
                                        size={'w-[40px] h-[40px]'}
                                    />
                                </div>
                            ))}
                        </div>}
                    </Scrollbars>
                </div>
                : <div className='w-full flex flex-auto flex-col px-3 '>
                    <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
                        {curSongData && <SongItem
                            thumbnail={curSongData?.thumbnail}
                            title={curSongData?.title}
                            artists={curSongData?.artistsNames}
                            sid={curSongData?.encodeId}
                            size={'w-[40px] h-[40px]'}
                            style='bg-main-500 text-white'
                        />}
                        <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
                            <span className=' text-sm font-bold'>
                                Tiếp theo
                            </span>
                            <span className='opacity-70 text-xs flex gap-1 '>
                                <span>
                                    Từ playlist
                                </span>
                                <span className='font-semibold text-main-500'>
                                    {curSongData?.album?.title?.length > 30 ? `${curSongData?.album?.title?.slice(0, 30)}...` : curSongData?.album?.title}
                                </span>
                            </span>
                        </div>
                        {playlist && <div className='flex flex-col py-2'>

                            {playlist?.map(item => (
                                <div key={item.encodeId} className='py-1'>
                                    <SongItem
                                        thumbnail={item?.thumbnail}
                                        title={item?.title}
                                        artists={item?.artistsNames}
                                        sid={item?.encodeId}
                                        size={'w-[40px] h-[40px]'}
                                    />
                                </div>
                            ))}
                        </div>}
                    </Scrollbars>
                </div>}
            <div className='w-full h-[90px]'></div>
        </div>
    )
}

export default SidebarRight