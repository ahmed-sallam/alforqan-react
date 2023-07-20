// import logo from './logo.svg';
// import './App.css';
import Login from './Login'
import Layout from './Layout'
import Staff from './Staff'
import Students from './Students'
import Exam from './Exam'
import PrivateRoute from './PrivateRoute'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import ProtectedLayout from './Layout/ProtectedLayout';

function App() {
  return (


    <BrowserRouter >
      <Routes >
        <Route path='/' element={<Layout />}>

          <Route path='/login' element={<Login />} index />
          <Route path='/dash' element={<ProtectedLayout />}>
            <Route path='staff' element={<Staff />} />
            <Route path='students' element={<Students />} />
            <Route path='exam/:id' element={<Exam />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
