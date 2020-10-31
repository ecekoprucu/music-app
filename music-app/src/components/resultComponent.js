import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import ReactAudioPlayer from 'react-audio-player';


const ResultComponent = ({props, darkMode}) => {
    const [playerArray, setPlayerArray] = useState([]);
    const [explanation, setExplanation] = useState('');


    useEffect(() => {
        if(document.getElementsByClassName("songName")[0]){
            document.getElementsByClassName("songName")[0].innerHTML = explanation;
        }
    }, [explanation]);



    const playSong = (song) => {
        if(!playerArray[0]){
            playerArray.push(<div><ReactAudioPlayer key={song.id} id='player' autoPlay controls src={song.url}/><p className="songName">Now Playing: <b> {song.name}</b> by <i>{song.artist_name}</i> from {song.album_name}</p></div>);
            return playerArray[0];
        } else {
            setPlayerArray([<div><ReactAudioPlayer key={song.id} id='player' autoPlay controls src={song.url} /><p className="songName">Now Playing: <b>{song.name}</b> by <i>{song.artist_name}</i> from {song.album_name}</p></div>]);
            return playerArray[0];
        }
    }

    const albumRedirect = (albumID, albumName) => {
        document.getElementById(albumName.split(" ").join("")).href= '?album=' + albumID;
    }

    return props.id!=="empty" &&  props.id!=="noRes" ? (
        <div className="result" id={props.id}>
          <img className="albumImage" src={props.album_images[2]} alt="#"/>
            {(!darkMode) ? <p className="songText">{props.name} in <a href="?" className="albumLink" id= {(props.album_name).split(" ").join("")} onClick={()=>albumRedirect(props.album_id, props.album_name)}>{props.album_name}</a></p> : <p className="songText lightText">{props.name} in <a href="?" className="albumLink" id= {(props.album_name).split(" ").join("")} onClick={()=>albumRedirect(props.album_id, props.album_name)}>{props.album_name}</a></p>}
            <button onClick={()=>{
                if(!document.getElementById("playerContainer")){
                    const playerContainer = document.createElement("div");
                    playerContainer.id= "playerContainer";
                    ReactDOM.createPortal(
                        playSong(props),
                        playerContainer
                    )
                    ReactDOM.render(playSong(props), playerContainer);
                    document.getElementById("pageContainer").appendChild(playerContainer);
                } else {
                    const playerContainer = document.getElementById("playerContainer");
                    playerContainer.firstElementChild.querySelector("audio").src=props.url;

                    setExplanation(`Now playing<b>: ${props.name} </b> by <i> ${props.artist_name}</i> from ${props.album_name}`);

                }
            }} className="playButton" id="playSong">Play</button>
            <a id={props.artist_name.split(" ").join("")} onClick={()=>{
                document.getElementById(props.artist_name.split(" ").join("")).setAttribute("href", "?artist="+props.artist_id);
            }} href="#"  className="artistName">{props.artist_name}</a>
            <a href={props.license_ccurl} target="_blank" className="licanse">License</a>
        </div>
    ) : <div id={props.id}> No result... </div>
}

export default ResultComponent;
