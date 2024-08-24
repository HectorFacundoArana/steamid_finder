"use client"
import { useEffect, useState } from "react";

export default function Info(){
  const regex = /(?<=\/id\/)\d+/
  const [steamIds, setSteamIds] = useState(null)
  const [dots, setDots] = useState('');

    const get_steamid = async (profileURL) => {        
        const response = await fetch(`https://steamid-finder-backend-three.vercel.app/get_steam_id?steam_url=${profileURL}`);
        const newData = await response.json();
        setSteamIds(newData)

    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const data = new FormData(e.target)

        if (data.has("profile_input")) {
          get_steamid(data.get("profile_input"))
        } 
      
    }


    useEffect(() => {
      const interval = setInterval(() => {

        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500);

      
      return () => clearInterval(interval);
    }, []); 

  


    
    return(
      <>
        <section className="flex flex-col p-4 h-1/2 sm:h-full justify-center items-center w-full ">
 
            <div className="flex flex-col sm:items-center sm:justify-center w-full h-full cursor-default">
              <div className="flex flex-col items-start p-4 gap-4 sm:p-6 sm:gap-6">
                <p className="text-sm text-gray-400 ">1. Go to your profile and use right click</p>
                <p className="text-sm text-gray-400 ">2. Copy and paste the link in the SteamID search bar</p>
                <p className="text-sm text-gray-400 ">3. Send your profile and wait</p>
              </div>
              <form onSubmit={handleSubmit} id="profile_form" name="profile_form" className="flex flex-col gap-4 w-full justify-center items-center p-6">
                <input type="url" className="w-full outline-none  px-2 py-1 xl:w-1/2 text-sm text-black text-center rounded-md" placeholder="www.steam.com/profile"	 id="profile_input" name="profile_input" required minLength="4" size="10" />
                <input type="submit" className="text-[12px] xl:text-[10px] px-6 py-1 border rounded-md font-semibold cursor-pointer text-gray-400 hover:text-white" value="SEND"/>
              </form>
            </div>
      </section>
      <section className="flex h-full w-full p-4 sm:h-3/4 ">
          {!steamIds ? ( 
            <div className="flex w-full h-full border-double border-4 border-gray-600 backdrop-blur-xl cursor-default">
                <div className="flex w-full items-center justify-center">
                  <p className="text-white text-opacity-35">Awaiting profile {dots}</p>
                </div>
            </div>
          ) : (
            <div className="flex w-full h-full items-center justify-center border-double border-4  border-gray-600 backdrop-blur-xl">
              <div className="flex flex-col w-full h-full items-center justify-center gap-4">
                <p className="text-white text-left text-sm text-opacity-35">SteamID 64: {steamIds.steamid64}</p>
                <p className="text-white text-left text-sm text-opacity-35">SteamID Hex: {steamIds.steamid_hex}</p>
              </div>
            </div>
          )}

      </section>
      </>
    )
}