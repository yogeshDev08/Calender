import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Appbar from './components/AppBar';
import Calendar from './components/Calender/Calender';
import Kanban from './components/Calender/Kanban';

function App() {

  return (
    <div className="App">
      <Appbar />
      <BrowserRouter>
        <Routes>
          <Route path="/details" element={<Kanban />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;