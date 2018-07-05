import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css';
import './assets/css/common.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {routes} from './routes'
import { renderRoutes } from 'react-router-config'

ReactDOM.render(
    <HashRouter>
		{/* {renderRoutes(routes)} */}
		<App />
    </HashRouter>,
    document.getElementById('root')
);
registerServiceWorker();
