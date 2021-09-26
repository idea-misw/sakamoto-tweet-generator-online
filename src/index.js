import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Header() {
  return (
    <header>
      <div className="container">
        <h1 className="title">サカモトツイートジェネレータオンライン</h1>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="copyright">© ΙΔΈΑ</p>
      </div>
    </footer>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
