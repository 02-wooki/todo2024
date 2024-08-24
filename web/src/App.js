import './App.css';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='AppContainer'>
      <Header />
      <BrowserRouter>
      <div className='body'>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
