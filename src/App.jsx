import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components';
import { Products, Login, Register } from './pages';

const PageWrapper = ({ children }) => {
  return <div className="overflow-y-auto h-full w-full">{children}</div>;
};

const AppWrapper = ({ children }) => {
  return <div className="flex flex-row w-full h-full">{children}</div>;
};

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <Sidebar />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<>Home /edit routes</>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </PageWrapper>
      </AppWrapper>
    </Router>
  );
};

export default App;
