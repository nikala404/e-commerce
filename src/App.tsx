import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DesktopPage from "./pages/DesktopPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProduct } from "./components/Cart";

const ProductContext = createContext<{
  addedProducts: CartProduct[];
  setAddedProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}>({
  addedProducts: [],
  setAddedProducts: () => {},
});

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [addedProducts, setAddedProducts] = useState<CartProduct[]>(() => {
    const storedProducts = localStorage.getItem("cartProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(addedProducts));
  }, [addedProducts]);

  return (
    <ProductContext.Provider value={{ addedProducts, setAddedProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<DesktopPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={1000} />
      </ProductProvider>
    </BrowserRouter>
  );
}

export { App, ProductContext };
