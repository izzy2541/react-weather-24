import React from 'react'
import { TbTemperature, TbWind  } from "react-icons/tb";
import { LuDroplet, LuSunset, LuSunrise  } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { formatToLocalTime, iconUrlFromCode } from '../services/WeatherService';



function TemperatureAndDetails({weather: {
  details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone }
}) {
  return (
    <div>
        <div className="flex items-center justify-center py-6 text-white">
            <p>{details}</p>
        </div>

        <div className='flex flex-row items-center justify-between text-white py-3'>
            <img 
            src={iconUrlFromCode(icon)}
            alt="the sun"
            className='w-20'
            />
            <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
            <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-sm items-center justify-center'>
                        <TbTemperature size={18} className="mr-1"/>
                        Real feel:
                        <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                        <LuDroplet size={18} className="mr-1"/>
                        Humidity:
                        <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
                </div>
                <div className='flex font-light text-sm items-center justify-center'>
                        <TbWind size={18} className="mr-1"/>
                        Wind:
                        <span className='font-medium ml-1'>{`${speed.toFixed()}km/h`}</span>
                </div>
            </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
            <LuSunrise/>
                <p className="font-light">Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span></p>
                <p className='font-light'></p>
                <LuSunset />
                <p className="font-light">Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span></p>
                <p className='font-light'></p>
                <FiSun/>
                <p className="font-light">High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span></p>
                <p className='font-light'></p>
                <FiSun/>
                <p className="font-light">Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span></p>
                <p className='font-light'></p>
            </div>
     
    </div>
  )
}

export default TemperatureAndDetails