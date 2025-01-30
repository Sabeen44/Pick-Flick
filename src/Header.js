import React from 'react'; 
import icon from './Images/movie-icon.png'


const Header = () => {
     return (
         <header className="custom-header">
            <img src={icon} alt="Logo" className='header-icon' />
             <h1>My Mood Movie</h1> </header> 
        ); 
    }; 
    
    export default Header;