import React from 'react'; 
import icon from './Images/movie-icon.png'


const Header = () => {
     return (
         <header className="custom-header">
            <img src={icon} alt="Logo" className='header-icon' />
             <h1>Pick Flick By Emoji Click</h1> </header> 
        ); 
    }; 
    
    export default Header;

    