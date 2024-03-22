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

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

export default function MainContent() {
  const [item, setItem] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setItem(res.data));
  }, []);

  return (
    <>
      <Main>
        <Container>
          {item.map((product: Product) => (
            <ProductInfo product={product} />
          ))}
        </Container>
      </Main>
    </>
  );
}
