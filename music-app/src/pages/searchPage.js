import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import AlbumPage from './albumPage';
import ArtistPage from './artistPage';
import Header from '../components/header';

import ResultComponent from '../components/resultComponent';


const SearchPage = () => {

    const [resultArray, setResultArray] = useState([]);
    const token = "1.ZWNla29wcnVjdUBnbWFpbC5jb20=.xjxgd7Q1BO4rybXTE4beobLE";
    const [darkMood, setDarkMood] = useState(false);
    const [searchPage, setSearchPage] = useState(false);
    let state = {}
    const [mutableState, setMutableState] = useState({});



    const getAlbum = async (str) => {
        try {
            const albumResponse = await axios.get(
                "https://musicdb.jobs.otsimo.com/api/album/" + str, {
                    headers: {
                        'authorization' : token
                    }
                })
            return albumResponse.data;

        } catch (err) {
            console.error(err);
        }
    }

    const getArtist = async (str) => {

        try {
            const artistResponse = await axios.get(
                "https://musicdb.jobs.otsimo.com/api/artist/" + str, {
                    headers: {
                        'authorization' : token
                    }
                })
            return artistResponse.data;

        } catch (err) {
            console.error(err);
        }
    }

    const loadPageVar = (varName) => {

       const urlParams= new URLSearchParams(window.location.search);

       return urlParams.get(varName);
    }


    const searchUrl = (urlParam) => {
         urlParam ? urlParam = urlParam : urlParam = window.location.href.substring(window.location.href.indexOf('?')+1, window.location.length).split("=").shift();

            if(urlParam==='album'){
                return getAlbum(loadPageVar("album")).then((res)=>{
                    setSearchPage(true);
                    state = {...state, ...res}
                    return state;
                });
            }

           if(urlParam==='artist'){
               return getArtist(loadPageVar("artist")).then((res) => {
                   setSearchPage(true);
                   state = {...state, ...res}
                   return state;
               });
           }


    }



    useEffect(()=>{
       if(loadPageVar("album")){
           searchUrl('album').then((te)=>{
               setMutableState(te);
           });
       } else if(loadPageVar("artist")) {
           searchUrl('artist').then((te)=>{
               setMutableState(te);
           });
       }
    },[]);


    useEffect(()=>{

            if(document.getElementById("pageContainer").classList.contains("viewportHeight")){
                document.getElementById("pageContainer").classList.remove("viewportHeight");
                if (document.getElementById("pageContainer").offsetHeight < window.innerHeight) {
                    document.getElementById("pageContainer").classList.add('viewportHeight');
                }
            } else {
                if (document.getElementById("pageContainer").offsetHeight <= window.innerHeight) {
                    document.getElementById("pageContainer").classList.add('viewportHeight');
                }
            }

    },[]);


    if(loadPageVar("album")){


            if(Object.entries(mutableState).length === 0){
                return(
                    <div id="pageContainer">
                        <Header setter={[resultArray, setResultArray]} searchPage={[searchPage, setSearchPage]} dMood={[darkMood, setDarkMood]}/>
                        <div id="results">
                            {resultArray.map((elem)=>{
                                return <ResultComponent key={elem.id} props={elem} darkMode={darkMood}/>
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id="pageContainer">
                        <Header setter={[resultArray, setResultArray]} searchPage={[searchPage, setSearchPage]} dMood={[darkMood, setDarkMood]}/>
                        <div id="resultCover">
                            {!darkMood ?  <h3>{mutableState.album.name ? mutableState.album.name : null}</h3> :  <h3 className="lightText">{mutableState.album.name ? mutableState.album.name : null}</h3>}
                            {mutableState.album.images[0] ? <img src={mutableState.album.images[0]} alt="#"/> : null}
                            {mutableState.album ? <AlbumPage darkProps={[darkMood, setDarkMood]} prop={mutableState} songDetail={mutableState.musics}/> : null}
                        </div>
                    </div>
                )
            }


        } else if(!loadPageVar("artist") && !loadPageVar('album')){
            return(
                <div id="pageContainer">
                    <Header setter={[resultArray, setResultArray]} searchPage={[searchPage, setSearchPage]} dMood={[darkMood, setDarkMood]}/>
                    <div id="results">
                        {resultArray.map((elem)=>{
                            return <ResultComponent key={elem.id} props={elem} darkMode={darkMood}/>
                        })}
                    </div>
                </div>);
        } else if(loadPageVar('artist')){


            if(Object.entries(mutableState).length === 0){
                return (
                    <div id="pageContainer">
                        <Header setter={[resultArray, setResultArray]} searchPage={[searchPage, setSearchPage]} dMood={[darkMood, setDarkMood]}/>
                        <div id="results">
                            {resultArray.map((elem)=>{
                                return <ResultComponent key={elem.id} props={elem} darkMode={darkMood}/>
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div id="pageContainer">
                        <Header setter={[resultArray, setResultArray]} searchPage={[searchPage, setSearchPage]} dMood={[darkMood, setDarkMood]}/>
                        <ArtistPage artist={mutableState}/>
                    </div>
                )
            }


        }


}
export default SearchPage;
