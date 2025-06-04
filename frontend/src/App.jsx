import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import allRoutesMapper from './routes';
import { Toaster } from 'react-hot-toast';
import MetaData from './utils/MetaData';
import ChatComponent from './views/features/chats/ChatComponent';

const OtherComponents = () => {
  return (
    <>
      <Toaster />
      <ChatComponent />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <MetaData />
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
