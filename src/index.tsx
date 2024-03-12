import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.less';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HashRouter basename="/">
    <App />
  </HashRouter>,
);
