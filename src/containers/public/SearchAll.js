import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../ultis/fn'
import { SongItem, List, SectionItem, Artist } from '../../components'
import { Link } from 'react-router-dom'

const SearchAll = () => {

    const { searchData } = useSelector(state => state.music)
    // console.log(searchData);
    return (
        <div className='w-full flex flex-col px-[60px] gap-[60px]'>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
                <div className='flex gap-8 '>
                    {searchData?.top && <div className='p-[10px] cursor-pointer flex-1 bg-main-200 rounded-md flex items-center'>
                        <Link
                            to={searchData?.top?.link}
                            className='flex gap-8'
                        >
                            <img src={searchData.top.thumbnail} alt='avatar' className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full'}`} />
                            <div className='flex flex-col text-xs'>
                                <span className='mb-6'>{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                                <span className='text-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>
                                {searchData.top.objectType === 'artist' && <span>{handleNumber(searchData?.artists[0]?.totalFollow) + ' quan tâm'}</span>}
                            </div>
                        </Link>
                    </div>}
                    {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
                        <div key={item.encodeId} className='flex-1 cursor-pointer bg-main-200 rounded-md flex gap-8 items-center'>
                            <SongItem
                                thumbnail={item.thumbnail}
                                sid={item.encodeId}
                                title={item.title}
                                artists={item.artistsNames}
                                size={'w-[84px] h-[84px]'}
                                style={'bg-main-200 pl-[10px]'}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Bài hát</h3>
                <div className='flex justify-between flex-wrap w-full'>
                    {searchData?.songs?.filter((item, index) => index <= 5)?.map((item, index) => (
                        <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 !== 0 ? 'pl-4' : 'pr-4'}`}>
                            <List
                                songData={item}
                                isHideAlbum
                                isHideNode
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Playlist/Album</h3>
                <div className='flex items-start justify-between gap-7'>
                    {searchData?.playlists?.filter((item, index) => index <= 4)?.map(item => (
                        <SectionItem
                            key={item.encodeId}
                            title={item.title}
                            link={item.link}
                            sortDescription={item.sortDescription}
                            thumbnailM={item.thumbnailM}
                            artistsNames={item.artistsNames}
                            paddingNone={true}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Nghệ sĩ</h3>
                <div className='flex gap-7'>
                    {searchData?.artists?.filter((item, index) => index <= 4)?.map(item => (
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
        </div>
    )
}

export default SearchAll