import React, { memo, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import { SongItem } from './'

const ChartSection = () => {

    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderRadius: i === 0 ? '#4a902e' : i === 1 ? '#50e3c2' : '#e35050',
                    pointHoverBorderWidth: 4,

                })
            }
            setData({ labels, datasets })
        }
    }, [chart])
    // console.log(data);
    return (
        <div className='px-[59px] mt-12 relative h-[430px]'>
            <div className='bg-[rgba(51,16,76,.95)] rounded-md w-full h-[430px]'></div>
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 bg-[rgba(77,23,104,0.9)] rounded-md'></div>
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 z-10 p-5 flex flex-col gap-8'>
                <h3 className='text-2xl text-white font-bold'>#zingchart</h3>
                <div className='flex gap-4 h-full'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {rank?.filter((item, index) => index < 3)?.map((item, index) => (
                            <SongItem
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={Math.round(item.score * 100 / chart?.totalScore)}
                            />
                        ))}
                    </div>
                    <div className='flex-7 h-[90%]'>
                        {data && <Line data={data} options={options} />}
                    </div>
                </div>
            </div>



        </div>
    )
}

export default memo(ChartSection)