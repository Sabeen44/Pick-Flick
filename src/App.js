//import logo from './logo.svg';
import './App.css';
import Header from './Header';
import EmojiList from './Movies.js';
import MovieList from './Movies';

function App() {
  return (
    <>
    <div className="App">
       <Header/>
     </div>
     <div>
       <EmojiList />
       
    </div>
    </>
  );
}

export default App;
