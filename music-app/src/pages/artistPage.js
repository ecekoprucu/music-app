import React, {useState, useEffect} from 'react';
import axios from 'axios';


const ArtistPage = ({artist}) => {
    console.log(artist);

    const albumRedirect = (albumID, albumName) => {
        document.getElementById(albumName.split(" ").join("")).href= '?album=' + albumID;
    }



    useEffect(()=>{
        if(document.getElementById("pageContainer").offsetHeight > window.innerHeight){
            document.getElementById("pageContainer").classList.remove('viewportHeight');
        } else {
            document.getElementById("pageContainer").classList.add('viewportHeight');        }
    },[]);

    return(
        <div className="outerDiv">
            <h3>{artist.artist.name}</h3>
            <div className="mainContainer">
                {artist.albums.map((el)=>{
                    return(
                        <div className="artistContainer" key={el.id}>
                            <img src={el.images[0]} className="artistAlbumImg" alt=""/>
                            <p>{el.name}</p>
                            <a href="#" id= {(el.name).split(" ").join("")} onClick={()=>albumRedirect(el.id, el.name)} className="reDirect">Album Details</a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArtistPage;


