import './App.css';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePicView from './Components/Profile/ProfilepicView/ProfilePicView';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div className='AppContainer'>
      <BrowserRouter>
      <div className='body'>
        <Routes>
          <Route path={process.env.PUBLIC_URL + '/'} element={<Main />} />
          <Route path={process.env.PUBLIC_URL + '/profile/pic'} element={<ProfilePicView />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
