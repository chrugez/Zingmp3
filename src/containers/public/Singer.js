import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis';
import icons from '../../ultis/icons'
import { SongItem, Section, Artist } from '../../components';

const { AiOutlineUserAdd, BiPlay } = icons
const Singer = () => {
    const singer = useParams()
    // console.log(singer);
    const [artistData, setArtistData] = useState(null)
    const [isHoverPlay, setisHoverPlay] = useState(false)
    const ref = useRef()

    useEffect(() => {
        const fetchArtistData = async () => {
            const res = await apiGetArtist(singer.singer)
            console.log(res);
            if (res.data.err === 0) {
                setArtistData(res.data.data)
            }
        }
        singer.singer && fetchArtistData()
    }, [singer])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", line: "nearest" })
    }, [singer])

    // console.log(artistData);
    return (
        <div className='flex flex-col w-full'>
            <div ref={ref} className='relative'>
                <img src={artistData?.cover} alt='background' className='h-[350px] object-cover w-full' />
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] text-white'>
                    {artistData?.topAlbum
                        ? <div className='absolute bottom-0 pb-6 '>
                            <div className='flex gap-8 items-center'>
                                <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
                                <span
                                    className='p-2 relative rounded-full text-main-500 cursor-pointer hover:text-gray-100 bg-white'
                                    onMouseEnter={() => setisHoverPlay(true)}
                                    onMouseLeave={() => setisHoverPlay(false)}
                                >
                                    <div className='w-8 h-8'></div>
                                    {isHoverPlay && <span className='absolute animate-scale-up-center top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] bg-main-500 rounded-full'></span>}
                                    <span className='absolute p-2 top-0 left-0 bottom-0 right-0 z-50'><BiPlay size={32} /></span>
                                </span>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <span className='text-sm text-gray-300'>
                                    {`${Number(artistData?.totalFollow?.toFixed(1)).toLocaleString()} người quan tâm`}
                                </span>
                                <button
                                    type='button'
                                    className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                                >
                                    <span><AiOutlineUserAdd /></span>
                                    <span className='text-xs opacity-70'>QUAN TÂM</span>
                                </button>
                            </div>
                        </div>
                        : <div className='absolute bottom-0 pb-6 '>
                            <div className='flex gap-8 items-center'>
                                <img src={artistData?.thumbnail} alt='avtart' className='w-[140px] h-[140px] rounded-full' />
                                <div className='flex flex-col'>
                                    <div className='flex gap-8 items-center'>
                                        <h1 className='text-[60px] font-bold'>{artistData?.name}</h1>
                                        <span
                                            className='p-2 relative rounded-full text-main-500 cursor-pointer hover:text-gray-100 bg-white'
                                            onMouseEnter={() => setisHoverPlay(true)}
                                            onMouseLeave={() => setisHoverPlay(false)}
                                        >
                                            <div className='w-8 h-8'></div>
                                            {isHoverPlay && <span className='absolute animate-scale-up-center top-[-1px] left-[-1px] right-[-1px] bottom-[-1px] bg-main-500 rounded-full'></span>}
                                            <span className='absolute p-2 top-0 left-0 bottom-0 right-0 z-50'><BiPlay size={32} /></span>
                                        </span>
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <span className='text-sm text-gray-300'>
                                            {`${Number(artistData?.totalFollow?.toFixed(1)).toLocaleString()} người quan tâm`}
                                        </span>
                                        <button
                                            type='button'
                                            className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
                                        >
                                            <span><AiOutlineUserAdd /></span>
                                            <span className='text-xs opacity-70'>QUAN TÂM</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
            <div className='mt-[30px] px-[60px] w-full gap-8 flex'>
                {artistData?.topAlbum
                    ? <div className='w-full gap-8 flex'>
                        <div className='w-[35%] flex-auto '>
                            <h3 className='mb-5 font-bold text-[20px]'>Mới Nhất</h3>
                            <div className='flex gap-4 p-4 pr-11 bg-[#c4cdcc] rounded-md'>
                                <img src={artistData?.topAlbum?.thumbnail} alt='thumbnail' className='w-[151px] h-[151px] object-cover rounded-md' />
                                <div className='flex flex-col text-xs gap-3 opacity-80'>
                                    <span>{artistData?.topAlbum?.textType}</span>
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-bold opacity-100'>{artistData?.topAlbum?.title}</span>
                                        <span>{artistData?.topAlbum?.artistsNames?.length > 30 ? `${artistData?.topAlbum?.artistsNames?.slice(0, 30)}...` : artistData?.topAlbum?.artistsNames}</span>
                                    </div>
                                    <span>{artistData?.topAlbum?.releaseDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-[55%] flex-auto '>
                            <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
                            <div className='flex flex-wrap w-full gap-3'>
                                {artistData?.sections?.find(item => item.sectionType === 'song')?.items?.filter((item, index) => index < 6)?.map(item => (
                                    <div className='w-[90%] min-[1024px]:w-[45%] gap-4 border-b border-gray-400' key={item.encodeId}>
                                        <SongItem
                                            thumbnail={item.thumbnail}
                                            title={item.title}
                                            artists={item.artistsNames}
                                            sid={item.encodeId}
                                            size={'w-[40px] h-[40px]'}
                                        />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                    : <div>
                        <div className='w-full flex-auto '>
                            <h3 className='mb-5 font-bold text-[20px]'>Bài hát nổi bật</h3>
                            <div className='flex flex-wrap w-full gap-3'>
                                {artistData?.sections?.find(item => item.sectionType === 'song')?.items?.filter((item, index) => index < 6)?.map(item => (
                                    <div className='w-[90%] min-[1024px]:w-[45%] gap-4 border-b border-gray-400' key={item.encodeId}>
                                        <SongItem
                                            thumbnail={item.thumbnail}
                                            title={item.title}
                                            artists={item.artistsNames}
                                            sid={item.encodeId}
                                            size={'w-[40px] h-[40px]'}
                                        />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>}
            </div>
            {artistData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
                <Section key={index} data={item} />
            ))}
            <div className='flex flex-col w-full px-[60px] mt-12'>
                <h3 className='text-lg font-bold mb-5'>{artistData?.sections?.find(item => item.sectionType === 'artist')?.title}</h3>
                <div className='flex gap-7'>
                    {artistData?.sections?.find(item => item.sectionType === 'artist')?.items?.map(item => (
                        <Artist
                            key={item.id}
                            title={item.name}
                            image={item.thumbnailM}
                            follower={item.totalFollow}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
            <div className='px-[60px] mt-12'>
                <h3 className='text-lg font-bold mb-5'>{`Về ${artistData?.name}`}</h3>
                <div className='flex gap-8'>
                    <img src={artistData?.thumbnailM} alt='thumbnailM' className='w-[45%] flex-none object-cover rounded-md' />
                    <div className='flex flex-col gap-8 text-sm'>
                        <p dangerouslySetInnerHTML={{ __html: artistData?.biography }}></p>
                        <div className='flex flex-col gap-2'>
                            <span className='text-[20px] font-bold'>{Number(artistData?.follow?.toFixed(1)).toLocaleString()}</span>
                            <span>Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </div>
    )
}

export default Singer