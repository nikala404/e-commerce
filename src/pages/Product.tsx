import { useEffect, useState } from "react";
import ProductInfo from "../components/ProductInfo";
import Header from "../desktop_page_components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import AddProductModal from "../components/AddProductModal";

import SimilarProductsSlider from "../components/SimilarProduct";

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  color: #003256;
  font-family: "Red Rose", serif;

  #product_div {
    max-width: 480px;
  }

  #modal_window {
    max-width: 340px;

    p,
    h3,
    h2 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }
  }

  p,
  h3,
  h2 {
    white-space: break-spaces;
    overflow: visible;
    text-overflow: unset;
    margin: 0;
  }

  div p {
    white-space: break-spaces;
    overflow: visible;
    text-overflow: unset;
    margin: 0;
    font-size: 16px;
  }
  span {
    height: 30px;
  }
  a {
    display: none;
  }
`;

const SimilarProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Product {
  amount: number;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [choosenProducts, setChoosenProducts] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/`)
      .then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    const displayedProduct = products.find((item) => item.id === Number(id));
    if (displayedProduct) {
      setChoosenProducts(displayedProduct);

      const similarProduct = products.filter(
        (item) =>
          item.category === displayedProduct.category && item.id !== Number(id)
      );
      setSimilarProducts(similarProduct);
    }
  }, [products, id]);

  return (
    <>
      <Header />
      <Main>
        {choosenProducts && (
          <>
            <ProductInfo
              product={choosenProducts as Product}
              id={choosenProducts?.id.toString() || ""}
              selectedId={(id) => {
                if (choosenProducts.id.toString() === id) {
                  setSelectedProduct(choosenProducts);
                }
              }}
              displayActionsModal={true}
            />
            <AddProductModal
              selectedProduct={selectedProduct}
              closeModal={() => setSelectedProduct(null)}
            />
            ;
          </>
        )}
      </Main>
      <SimilarProduct>
        {similarProducts.length > 0 && (
          <SimilarProductsSlider similarProducts={similarProducts} />
        )}
      </SimilarProduct>
    </>
  );
}
