import './App.css';
import { Header, ListOfNews, MyFavorites, Buttons } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <BrowserRouter>
          <Buttons />
          <Routes>


            <Route path="/" element={<ListOfNews />} />
            <Route path="/Favs" element={<MyFavorites />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
