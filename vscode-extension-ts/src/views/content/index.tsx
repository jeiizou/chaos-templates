import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.querySelector('#root'),
);
