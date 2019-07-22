import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Search from '../components/Search/Search';
import SearchList from '../components/SearchList/SearchList';
import Profile from '../components/Profile/Profile';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="app__heading">GFK Tech Test</h1>
      <div className='app__container'>
        <BrowserRouter>
          <Route exact path="/" component={Search} />
          <Route path="/search" component={Search} />
          <Route path="/search/:query" component={SearchList} />
          <Route path="/profile/:query" component={Profile} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
