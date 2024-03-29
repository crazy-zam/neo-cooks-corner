import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.less';
import App from './App';
import { ToastContainer } from 'react-toastify';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';
// import { spy } from 'mobx';

// spy((ev) => {
//   if (ev.type.includes('action')) {
//     console.log(ev);
//   }
// });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HashRouter basename="/">
    <App />
    <ToastContainer />
  </HashRouter>,
);
