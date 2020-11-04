import React, {useEffect} from 'react';
import SearchPage from './pages/searchPage';
import './App.css';

const App = () => {

    useEffect(()=>{
        document.title= "Music App";
    },[])

    return (
        <div className="App" id="App">
            <SearchPage/>
        </div>
     )
}

export default App;
