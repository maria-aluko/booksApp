import { createBrowserRouter } from "react-router-dom";
import AddBook from "./AddBook";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Books from "./Books";
import SinglePage from "./SinglePage";

export const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Root />, 
    errorElement: <ErrorPage/>, 
    children: [
      { path: '/', element: <Books /> },
      { path: '/:id', element: <SinglePage />},
      { path: '/addnew', element: <AddBook /> },
  ],
},  
],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);