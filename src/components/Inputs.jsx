import React, { useState } from 'react'
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { toast } from 'react-toastify';


function Inputs({setQuery, units, setUnits}) {
    const [city, setCity] = useState("");

    const handleSearchClick = () => {
        if (city !== '') setQuery({q: city})
    }

   const handleUnitsChange = (e) => {
 const selectedUnit = e.currentTarget.name;
 if(units !== selectedUnit) setUnits(selectedUnit);
   };

    const handleLocationClick = () => {
        if(navigator.geolocation){
            toast.info('Fetching users location.')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Location fetched!");
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat, 
                    lon,
                })
            })
        }
    }
    return (
        // <div className="flex flex-row justify-center my6">
        //     <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        //         <input
        //         value={city}
        //         onChange={(e) => setCity(e.currentTarget.value)}
        //             placeholder="search for city..."
        //             type="text"
        //             className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        //         />
        //         <CiSearch size={30} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearchClick}/>
        //         <CiLocationOn size={30} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocationClick}/>
        //         <div className='flex flex-row w-1/4 items-center justify-center'>
        //             <button
        //             name="metric"
        //             className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange}>
        //                 °C
        //             </button>
        //             <p className="text-xl text-white mx-1">|</p>
        //             <button
        //             name="imperial"
        //             className="text-xl text-white font-light transition ease-out hover:scale-125" onClick={handleUnitsChange}>
        //                 °F
        //             </button>
        //         </div>
        //     </div>

        // </div>
        <div className="flex flex-row justify-center my-6">
    <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
        <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            placeholder="search for city..."
            type="text"
            className=" lg:text-lg md:text-sm sm:text-sm font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder-lowercase "
        />
        <CiSearch size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleSearchClick} />
        <CiLocationOn size={30} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleLocationClick} />
        <div className="flex flex-row items-center justify-center">
            <button
                name="metric"
                className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
                onClick={handleUnitsChange}
            >
                °C
            </button>
            <p className="text-lg md:text-xl text-white mx-1">|</p>
            <button
                name="imperial"
                className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
                onClick={handleUnitsChange}
            >
                °F
            </button>
        </div>
    </div>
</div>


    )
}

export default Inputs