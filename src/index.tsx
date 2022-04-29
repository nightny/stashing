import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ExternalSearchResultsPage from './pages/ExternalSearchResultsPage';
import E621PostPage from './pages/E621PostPage';
import E621ImportPage from './pages/E621ImportPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container-fluid py-3">
        <Header/>
        <Routes>
          <Route path="/external">
            <Route path="nhentai" element={<ExternalSearchResultsPage site="nhentai"/>}/>
            <Route path="e621">
              <Route path=":id" element={<E621PostPage/>}/>
              <Route path="" element={<ExternalSearchResultsPage site="e621"/>}/>
            </Route>
            <Route path="" element={<ExternalSearchResultsPage/>}/>
          </Route>
          <Route path="/import">
            <Route path="e621/:id">
              <Route path="" element={<E621ImportPage/>}/>
            </Route>
          </Route>
          <Route path="*" element={<ExternalSearchResultsPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
