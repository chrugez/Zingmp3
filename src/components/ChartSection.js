import React, { memo, useState, useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import { SongItem } from './'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import path from '../ultis/path'
import icons from '../ultis/icons'

const { BiPlay } = icons

const ChartSection = () => {

    const [data, setData] = useState(null)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    })
    const [selected, setSelected] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const chartRef = useRef()
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
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        })
                    }
                    // console.log(+tooltip.body[0]?.lines[0].replace(',',''));
                    const rs = counters.find(i => i.data.some(n => n === +tooltip.body[0]?.lines[0].replace(',', '')))
                    setSelected(rs.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,

                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
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
        <div className='px-[59px] mt-12 relative h-[430px] rounded-md'>
            <div className='bg-[rgba(51,16,76,.95)] rounded-md w-full h-[430px]'></div>
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 bg-[rgba(77,23,104,0.9)] rounded-md'></div>
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 z-10 p-5 flex flex-col gap-8 rounded-md'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center'>
                    <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>#zingchart</h3>
                    <span className='bg-white rounded-full p-1 hover:text-green-800'><BiPlay size={18} /></span>
                </Link>
                <div className='flex gap-4 h-full'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {rank?.filter((item, index) => index < 3)?.map((item, index) => (
                            <SongItem
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={Math.round(item.score * 100 / chart?.totalScore)}
                                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945ea7]'
                            />
                        ))}
                        <Link to={path.ZING_CHART} className='text-white px-4 py-2 m-auto rounded-l-full rounded-r-full border border-white w-fit'>Xem thêm</Link>
                    </div>
                    <div className='flex-7 h-[90%] relative'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
                            <SongItem
                                thumbnail={rank?.find(i => i.encodeId === selected)?.thumbnail}
                                title={rank?.find(i => i.encodeId === selected)?.title}
                                artists={rank?.find(i => i.encodeId === selected)?.artistsNames}
                                sid={rank?.find(i => i.encodeId === selected)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default memo(ChartSection)