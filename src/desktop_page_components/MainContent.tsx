import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductInfo from "../components/ProductInfo";
import AddProductModal from "../components/AddProductModal";

const Main = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
  color: #003256;
  font-family: "Red Rose", serif;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  max-width: 1440px;
`;

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export default function MainContent({ searchQuery }: { searchQuery: string }) {
  const [items, setItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setItems(res.data));
  }, []);

  return (
    <>
      <Main>
        <Container>
          {items
            .filter((el) => {
              if (searchQuery.length > 0) {
                return el.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              }
              return true;
            })
            .map((product) => (
              <ProductInfo
                diplayActionsModal={true}
                key={product.id}
                product={product}
                id={product.id.toString()}
                selectedId={(id) => {
                  const selected = items.find(
                    (item) => item.id.toString() === id
                  );
                  if (selected) {
                    setSelectedProduct(selected);
                  }
                }}
              />
            ))}

          <AddProductModal
            selectedProduct={selectedProduct}
            closeModal={() => setSelectedProduct(null)}
          />
        </Container>
      </Main>
    </>
  );
}
