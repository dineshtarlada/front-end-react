
import { Route, Routes } from 'react-router';
import './App.css';
import MainComponent from './features/mainpage';
import EmployeeDashboard from './features/employee/employeedashboard';
import LogIn from './features/auth/login';
import ManagerDashboard from './features/manager/managerdashboard';
import HrDashboard from './features/hr/hrdashboard';
import LeaderBoard from './features/employee/components/leaderboard';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<MainComponent />}></Route>
          <Route path="/employee/dashboard" element={<EmployeeDashboard/>}></Route>
         
          <Route path="/manager/dashboard" element={<ManagerDashboard/>}></Route>
          <Route path="/hr/dashboard" element={<HrDashboard/>}></Route>
          <Route path="/user/login" element={<LogIn />}></Route>
         
        </Routes>
    </div>
  );
}

export default App;
