import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Header = ({setter, dMood, searchPage}) => {

    const [searchValue, setSearchValue] = useState('');
    const token = "1.ZWNla29wcnVjdUBnbWFpbC5jb20=.xjxgd7Q1BO4rybXTE4beobLE";
    const [mood, setMood] = useState(dMood[0]);



    const searchMe = async () => {

        if(searchValue==='' || !searchValue){
            return {musics: 'Empty'};
        }

        try{
            const response= await axios.get('https://musicdb.jobs.otsimo.com/api/music/search?q=' + searchValue,{
                headers : {
                    'authorization' : token
                }
            })

            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div id="searchCover">
            <input type="text" id="searchText" placeholder="Search..." name="searchBox" value={searchValue} onChange={(event)=> {
                setSearchValue(event.target.value);
            }}/>
            <button id="searchClick" onClick={() => {
                if(window.location.href.includes("album") || window.location.href.includes("artist")){
                    window.history.replaceState({}, document.title, "/");
                    searchPage[1](false);
                }
                searchMe().then((res)=>{
                    const results = res.musics;

                    if(results==='Empty'){
                        setter[1]([{id: 'empty', name: "You didn't search anything..."}]);
                        setTimeout(function(){
                            window.location.href='?';
                        },1000)
                        return false;
                    }
                    if(!results){
                        setter[1]([{id: 'noRes', name: "Can't find any results..."}]);
                        setTimeout(function(){
                            window.location.href='?';
                        },1000);
                        return false;
                    }
                    setter[1](results);
                    if(document.getElementById("pageContainer").classList.contains("viewportHeight")){
                        document.getElementById("pageContainer").classList.remove("viewportHeight");
                        if (document.getElementById("pageContainer").offsetHeight < window.innerHeight) {

                            document.getElementById("pageContainer").classList.add('viewportHeight');
                        }
                    } else {
                        if (document.getElementById("pageContainer").offsetHeight < window.innerHeight) {
                            document.getElementById("pageContainer").classList.add('viewportHeight');
                        }
                    }
                });
            }}><FontAwesomeIcon id="searchIcon" icon={faSearch}/>
                Search...
            </button>
            <button id="moodChange" onClick={() => {
                setMood(!mood);
                if(!mood){
                    document.getElementById("pageContainer").style.background = "#383838";
                    document.getElementById("searchCover").style.background = "#3d7594";
                    document.getElementById("searchText").style.borderBottom = "1px solid #262525";
                    document.getElementById("searchText").classList.add("lightText");
                    dMood[1](!dMood[0]);
                } else {
                    document.getElementById("pageContainer").style.background = "whitesmoke";
                    document.getElementById("searchCover").style.background = "#8fcce5";
                    document.getElementById("searchText").style.borderBottom = "1px solid #616161";
                    document.getElementById("searchText").classList.remove("lightText");
                    dMood[1](!dMood[0]);
                }
            }}>{(!mood) ? <FontAwesomeIcon id="darken" icon={faMoon}/> : <FontAwesomeIcon id="lighten" icon={faSun}/>}</button>
        </div>
    )
}

export default Header;
