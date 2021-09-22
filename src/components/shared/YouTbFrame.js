import styled from 'styled-components'
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import {useInViewport} from 'react-in-viewport';
import {useRef, useState, useContext} from 'react'
import YoutubeContext from '../../contexts/YoutubeContext';

export default function YouTbFrame({youtubeId}) {
    const refPlayerElement = useRef();
    const { youtubeVideos, setYoutubeVideos } = useContext(YoutubeContext);

    const [player, setPlayer] = useState({
        eventTarget: null,
        playing: false,
        playerId: youtubeId
    });

    //hook to observe if video is in viewport
    const {inViewport} = useInViewport(
        refPlayerElement,
      {},
      {disconnectOnLeave: false},
      {onEnterViewport,onLeaveViewport}
    );
 
    const opts = {
        width: '90%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          fs:0,
        },
      };
 
    function onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        setPlayer({...player, eventTarget: event.target})
        setYoutubeVideos([...youtubeVideos,player])
    }

    function onPlay(e) {
        console.log(youtubeVideos)
        setPlayer({...player, playing: true})
    }

    function onPause(e) {
        setPlayer({...player, playing: false})
    }

    function onLeaveViewport() {
        if (player.playing === true) {
            setPlayer({...player,playing:false})
            player.eventTarget.pauseVideo();
        }
    }

    function onEnterViewport() {}

    return (
        <YouTube 
            ref={refPlayerElement} 
            videoId={youtubeId} 
            opts={opts} 
            onReady={onReady} 
            onPlay={onPlay}
            onPause={onPause}
        />
    )
}
