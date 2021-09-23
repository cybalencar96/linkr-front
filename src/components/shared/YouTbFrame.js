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
          autoplay: 0,
          fs:0,
        },
    };
 
    function onReady(event) {
        player.eventTarget = event.target
        setYoutubeVideos([...youtubeVideos,player])
        setPlayer(player)
    }

    function onPlay(e) {
        player.playing = true;
        const videosStopped = youtubeVideos.filter(video => video !== player).map(video => {
            if (video.playing) {
                video.playing = false
                video.eventTarget.pauseVideo();
            }
            return video;
        })

        setYoutubeVideos([...videosStopped,player])
        setPlayer(player);
    }

    function onPause(e) {
        player.playing = false
        setPlayer(player)
    }

    function onLeaveViewport() {
        if (player.playing === true) {
            player.playing = false
            player.eventTarget.pauseVideo();
            setPlayer(player)
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

