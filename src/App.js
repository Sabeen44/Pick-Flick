//import logo from './logo.svg';
import './App.css';
import Header from './Header';
import EmojiList from './Movies.js';
//import MovieList from './Movies';
import EmojiCategories from './EmojiCategories.js';
import MovieList from './FetchMovieTest';



function App() {
  return (
    <>
    <div className="App">
       <Header/>
     </div>
     <div>
       <EmojiList />
        <EmojiCategories/> 
        <MovieList/> 
       
       
    </div>
    </>
  );
}

export default App;
