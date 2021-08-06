import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initDataStore } from './common/utils';
import { RecoilRoot } from 'recoil';
import './styles/index.scss';

initDataStore();

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.querySelector('#root'),
);
