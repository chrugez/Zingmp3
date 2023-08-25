import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { SectionItem } from './'

const Section = ({ data }) => {

    const { currentWidth } = useSelector(state => state.app)
    // console.log(data.items.filter((item, index) => index <= (currentWidth < 600 ? 2 : currentWidth < 800 ? 3 : 4)));
    return (
        <div className='mt-12 px-[44px] flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold px-4'>{data?.title}</h3>
                <span className='text-xs uppercase px-4'>
                    Tất cả
                </span>
            </div>
            <div className='flex '>
                {data && data?.items?.length > 0 && data.items.filter((item, index) => index <= 4)?.map(item =>
                (
                    <SectionItem
                        key={item.encodeId}
                        data={data}
                        title={item.title}
                        link={item.link}
                        sortDescription={item.sortDescription}
                        thumbnailM={item.thumbnailM}
                        artistsNames={item.artistsNames}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(Section)