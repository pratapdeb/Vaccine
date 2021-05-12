import React, {useEffect, useState} from 'react'
import Sound from 'react-sound'
import message_tones_mmdmr from './message_tones_mmdmr.mp3'

const PlaySound = (hsl, hsp, hsfp) => {
    const [isPlaying,  setIsPlaying] =  useState(false)
    useEffect(()=>{
        setIsPlaying(true)
    },[])
    return (
        <div>
            {/* <button onClick={()=>setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play':'Stop'}</button> */}
            <Sound
            url={message_tones_mmdmr}
            playStatus={isPlaying?Sound.status.PLAYING:Sound.status.STOPPED}
onLoading={hsl}
onPlaying={hsp}
onFinishedPlaying={hsfp}

            />
        </div>
    )
}

export default PlaySound