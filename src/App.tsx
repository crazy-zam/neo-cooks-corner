import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/registration" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </div>
  );
}

export default App;
