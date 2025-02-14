import './App.css';
import Main from './pages/Main/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageOne from './pages/PageOne/PageOne';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pageone" element={<PageOne />} />
          {/* <Route path="/page2" element={<Page2 />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
