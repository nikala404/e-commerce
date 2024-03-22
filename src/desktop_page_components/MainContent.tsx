import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductInfo from "../components/ProductInfo";

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
const Product = styled.div`
  max-width: 300px;
  img {
    width: 100%;
    height: 300px;
  }
`;

interface MainContentProps {
  searchQuery: string;
}

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export default function MainContent({ searchQuery }: MainContentProps) {
  const [items, setItems] = useState<Product[]>([]);

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
              <ProductInfo key={product.id} product={product} />
            ))}
        </Container>
      </Main>
    </>
  );
}
