import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis';

const Singer = () => {
    const singer = useParams()
    console.log(singer);
    const [artistData, setArtistData] = useState(null)

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

    console.log(artistData?.cover);
    return (
        <div className='flex flex-col w-full'>
            <img src={artistData?.cover} alt='background' className='mt-[-70px]' />
        </div>
    )
}

export default Singer