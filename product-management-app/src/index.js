import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BrandManagement from './BrandManagement';
import ProductManagement from './ProductManagement';
import Product from './pages/product';
import ModelManagement from './pages/modelManagement';
import Attribute from './pages/attribute';
import HomePage from './pages/HomePage';
import DescribeTagManagement from './pages/DescribeTagManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "brand",
    element: <BrandManagement />
  },
  {
    path: "model",
    element: <ModelManagement />
  },
  {
    path: "attribute",
    element: <Attribute />
  },
  {
    path: "product",
    element: <Product />
  },
  {
    path: "describeTag",
    element: <DescribeTagManagement />
  }
])
// const router = createBrowserRouter([
//   {
//     path: "/",
//     // element: <App />,
//     element: <div>你好</div>,
//     children: [
//       {
//         path: "brand",
//         // element: <BrandManagement />
//         element: <div>brand</div>,
//       },
//       {
//         path: "product",
//         element: <ProductManagement />
//       }
//     ]
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
