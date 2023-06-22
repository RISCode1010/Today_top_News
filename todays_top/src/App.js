
// import './App.css';
// import  {useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import './p2.css';
// import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const pageSize = 6;
  // const [progress, setProgress] = useState(0);

  return (
    <>
      <Router>
        <Navbar/>
        {/* <LoadingBar height={3} color='#f11946' progress={progress} /> */}
        <Routes>
            <Route exact path="/" element={<News key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News key="business" pageSize={pageSize} country="in" category="business"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
            <Route exact path="/health" element={<News key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize={pageSize} country="in" category="science"/>} />
            <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country="in" category="technology" />} />
            {/* <Route path="about/*" element={<Navbar key="general" pageSize={pageSize} country="in" category="general"/>} />
            <Route path="Contact/*" element={<Navbar key="general" pageSize={pageSize} country="in" category="general"/>} /> */}
          </Routes> 
      </Router>
    </>
  );
}

export default App;
