import React from 'react'
import { useSelector } from 'react-redux/'
import { Slider, Section, NewRelease, ChartSection, Loading } from '../../components'
import { Link } from 'react-router-dom'


const Home = () => {

    const { sec1, sec2, sec3, sec4, sec5, sec6, sec7, weekChart } = useSelector(state => state.app)
    return (
        <>
            {(sec1 && sec2 && sec3 && sec4 && sec5 && sec6 && sec7 && weekChart)
                ? <div className='overflow-y-auto '>
                    <div className='w-full h-[70px]'></div>
                    <Slider />
                    <Section data={sec1} />
                    <NewRelease />
                    <Section data={sec2} />
                    <Section data={sec3} />
                    <Section data={sec4} />
                    <Section data={sec5} />
                    <ChartSection />
                    <div className='flex items-center px-[43px] w-full mt-12'>
                        {weekChart?.map(item => (
                            <Link to={item?.link?.split('.')[0]} key={item.link} className='flex-1 px-4'>
                                <img src={item.cover} alt='cover' className='w-full object-cover rounded-md' />
                            </Link>
                        ))}
                    </div>
                    <Section data={sec6} />
                    <Section data={sec7} />
                </div>
                : <div className='w-full h-full flex justify-center items-center'>
                    <Loading />
                </div>
            }
        </>
    )
}

export default Home