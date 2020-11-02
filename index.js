import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '@babel/polyfill';

import App from './App';

import 'antd/dist/antd.css';
import './style.scss';

axios.defaults.baseURL = 'https://git.heroku.com/herolo-task-message-app.git/api';
// axios.defaults.baseURL = 'http://localhost:3000/api';

ReactDOM.render(<App />, document.getElementById('root'));
