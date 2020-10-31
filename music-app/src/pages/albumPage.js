import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';
import ReactDOM from 'react-dom'
const AlbumPage = ({prop, songDetail, darkProps}) => {
    const [playArray, setPlayArray] = useState([]);
    const [explanation, setExplanation] = useState('');

    useEffect(() => {
        if(document.getElementsByClassName("songName")[0]){
            document.getElementsByClassName("songName")[0].innerHTML = explanation;
        }
    }, [explanation]);

    useEffect(()=>{

            if(document.getElementById("pageContainer").classList.contains("viewportHeight")){
                console.log(document.getElementById("pageContainer").offsetHeight)

                document.getElementById("pageContainer").classList.remove("viewportHeight");
                if (document.getElementById("pageContainer").offsetHeight < window.innerHeight) {
                    document.getElementById("pageContainer").classList.add('viewportHeight');
                }
            } else {
                console.log(document.getElementById("pageContainer").offsetHeight)
                if (document.getElementById("pageContainer").offsetHeight <= window.innerHeight) {
                    document.getElementById("pageContainer").classList.add('viewportHeight');
                }
            }

    },[]);


    const playSong = (song) => {
        if(!playArray[0]){
            playArray.push(<div><ReactAudioPlayer key={song.id} id='player' autoPlay controls src={song.url}/><p className="songName">Now Playing: <b> {song.name}</b> by <i>{song.artist_name}</i> from {song.album_name}</p></div>);
            return playArray[0];
        } else {
            setPlayArray([<div><ReactAudioPlayer key={song.id} id='player' autoPlay controls src={song.url} /><p className="songName">Now Playing: <b>{song.name}</b> by <i>{song.artist_name}</i> from {song.album_name}</p></div>]);
            return playArray[0];
        }
    }

    return (
        <div key={"detail"+prop.id} id="albumContainer">
            {songDetail.map((elem)=>{
                return(
                   <div key={"name"+elem.id} className="songDiv">
                       <FontAwesomeIcon icon={faPlay} onClick={()=>{
                           if(!document.getElementById("playerContainer")){
                               const playerContainer = document.createElement("div");
                               playerContainer.id= "playerContainer";
                               ReactDOM.createPortal(
                                   playSong(elem),
                                   playerContainer
                               )
                               ReactDOM.render(playSong(elem), playerContainer);
                               document.getElementById("resultCover").appendChild(playerContainer);
                           } else {
                               const playerContainer = document.getElementById("playerContainer");
                               playerContainer.firstElementChild.querySelector("audio").src=elem.url;

                               setExplanation(`Now playing<b>: ${elem.name} </b> by <i> ${elem.artist_name}</i> from ${elem.album_name}`);

                           }
                       }} className="playIcon"/>
                       {(!darkProps[0]) ?  <p className="albumSongName">{elem.name}</p> :  <p className="albumSongName lightText">{elem.name}</p> }
                       {(!darkProps[0]) ? <p className="duration">({Math.floor(elem.duration / 60)}.{elem.duration - Math.floor(elem.duration / 60) * 60})</p> : <p className="duration lightText">({Math.floor(elem.duration / 60)}.{elem.duration - Math.floor(elem.duration / 60) * 60})</p>}
                   </div>
                )
            })}
        </div>
    )
}

export default AlbumPage;
