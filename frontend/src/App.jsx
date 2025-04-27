import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import allRoutesMapper from './routes';
import { Toaster } from 'react-hot-toast';

const OtherComponents = () => {
  return (
    <>
      <Toaster />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {allRoutesMapper?.map((singleRoute, index) => (
            <Route key={index} path={singleRoute?.path} element={singleRoute?.component} />
          ))}
        </Routes>
      </BrowserRouter>

      <OtherComponents />
    </div>
  );
}

export default App;
