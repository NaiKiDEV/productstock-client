import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { selectAuth } from './auth';
import { Sidebar } from './components';
import {
  Products,
  Login,
  Register,
  ProductAdd,
  CategoryAdd,
  Categories,
  Users,
} from './pages';

const PageWrapper = ({ children }) => {
  return <div className="overflow-y-auto h-full w-full">{children}</div>;
};

const AppWrapper = ({ children }) => {
  return <div className="flex flex-row w-full h-full">{children}</div>;
};

const App = () => {
  const { role } = useSelector(selectAuth);

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
            {(role === 'Admin' || role === 'Warehouse') && (
              <>
                <Route path="/products/add" element={<ProductAdd />} />
              </>
            )}
            {role === 'Admin' && (
              <>
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/add" element={<CategoryAdd />} />
                <Route path="/users" element={<Users />} />
              </>
            )}
            <Route
              path="*"
              element={
                <div className="h-full w-full text-lightblue bg-lightdarkblue flex flex-col justify-center items-center">
                  <div className="text-5xl">404</div>
                  <div className="text-xl">Page not found</div>
                </div>
              }
            />
          </Routes>
        </PageWrapper>
      </AppWrapper>
    </Router>
  );
};

export default App;
