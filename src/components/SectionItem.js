import React, { memo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import icons from '../ultis/icons'

const { AiOutlineHeart, BiPlay, BiDotsHorizontalRounded } = icons

const SectionItem = ({ link, title, thumbnailM, artistsNames, sortDescription, data, paddingNone }) => {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const imageRef = useRef()

    const handleHover = (e) => {
        setIsHover(true)
        imageRef.current.classList?.remove('animate-scale-down-image')
        imageRef.current.classList?.add('animate-scale-up-image')
    }

    const handleLeave = (e) => {
        setIsHover(false)
        imageRef.current.classList?.remove('animate-scale-up-image')
        imageRef.current.classList?.add('animate-scale-down-image')
    }

    return (
        <div
            onClick={() => { navigate(link?.split('.')[0], { state: { playAlbum: false } }) }}
            className={`flex flex-col gap-3 text-sm w-1/5 ${paddingNone ? '' : 'px-4'} cursor-pointer `}
        >
            <div
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className='relative w-full overflow-hidden rounded-lg'>
                {isHover && <div className='absolute top-0 left-0 bottom-0 right-0 z-20 bg-overlay-30 rounded-lg text-white flex items-center justify-center gap-3'>
                    <span>
                        <AiOutlineHeart size={25} />
                    </span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(link?.split('.')[0], { state: { playAlbum: true } })
                        }}
                        className='p-1 border border-white rounded-full'
                    >
                        <BiPlay size={35} />
                    </span>
                    <span>
                        <BiDotsHorizontalRounded size={25} />
                    </span>
                </div>}
                <img ref={imageRef} src={thumbnailM} alt='avatar' className='w-full h-auto object-cover rounded-lg' />
            </div>
            <span className='flex flex-col'>
                <span className='font-semibold'>{title?.length > 30 ? title.slice(0, 26) + '...' : title}</span>
                {/* <span >{sortDescription?.slice(0, 35)}</span> */}
                {data?.sectionId === 'h100' ? <span>{artistsNames}</span> : data?.sectionId === 'hAlbum' ? <span>{artistsNames}</span> : <span>{sortDescription?.length >= 40 ? `${sortDescription?.slice(0, 35)}...` : sortDescription}</span>}
            </span>
        </div>
    )
}

export default memo(SectionItem)