import styled from 'styled-components'
import {useState, useEffect, useRef} from 'react'
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';
const videoUrl = "/"

export default function YouTbFrame({videoUrl}) {
    // const videoPlayer = useRef(null);
    // const {
    //     playerState, 
    //     handleTimeUpdate, 
    //     toggleVideoPlay,
    //     handleChangeVideoUpdate
    // } = usePlayerState(videoPlayer);
    // const [inputRange, setInputRange] = useState(0);

    const opts = {
        height: '290',
        width: '500',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
 
    const youtubeId = getYouTubeID(videoUrl);
    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }


    return (
        <VideoContainer>
            <YouTube videoId={youtubeId} opts={opts} onReady={onReady} />
        </VideoContainer>
    )
    
}

const VideoContainer = styled.article`

`

// function usePlayerState(videoPlayer) {
//     const [playerState, setPlayerState] = useState({
//         playing: false,
//         percentage: 0,
//     })

//     useEffect(() => {
//         playerState.playing ? videoPlayer.current.pause() : videoPlayer.current.play()
//     },[playerState.playing,videoPlayer])

//     function toggleVideoPlay() {
//         setPlayerState({
//              ...playerState,
//              playing: !playerState.playing,
//         })
//     }

//     function handleTimeUpdate() {
//         const currentPercentage = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100
//         setPlayerState({...playerState,percentage: currentPercentage})
//     }

//     function handleChangeVideoUpdate(e) {
//         const currentPercentage = e.target.value
//         setPlayerState({...playerState, percentage: currentPercentage})
//         videoPlayer.current.currentTime = videoPlayer.current.duration / 100 * currentPercentage
//     }

//     return {
//         playerState,
//         handleTimeUpdate,
//         toggleVideoPlay,
//         handleChangeVideoUpdate
//     }
// }