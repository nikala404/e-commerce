import { styled } from "styled-components";
import { Product } from "../desktop_page_components/MainContent";
import ProductInfo from "./ProductInfo";
import { useState } from "react";
import AddProductModal from "./AddProductModal";

const Container = styled.section`
  position: relative;
  display: flex;
  max-width: 1540px;
  width: 100%;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  font-family: "Red Rose", serif;
`;

const Controller = styled.div`
  font-family: "Red Rose", serif;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: -webkit-fill-available;
  span {
    width: 80px;
    display: flex;
    justify-content: space-between;
  }

  button {
    border-radius: 50%;
    width: 35px;
    height: 32px;
    border: none;
    cursor: pointer;
    color: #ffffff;
    background: #e4e3eb;
  }
`;
const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  border-radius: 12px;
  width: 100%;
  color: #003256;
  font-family: "Red Rose", serif;
  p,
  h3,
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
  span {
    height: 30px;
  }
  a {
    display: flex;
    align-items: center;
  }
`;

export default function SimilarProductsSlider({
  similarProducts,
}: {
  similarProducts: Product[];
}) {
  const [currentProductNumber, setCurrentProductNumber] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!similarProducts.length) return null;

  return (
    <>
      <Controller>
        <h2>Similar Products</h2>{" "}
        <span>
          <button
            onClick={() =>
              setCurrentProductNumber((prev) => (prev === 0 ? prev : prev - 1))
            }
            style={{
              backgroundColor: currentProductNumber !== 0 ? "#5D37F3" : "",
            }}
          >
            &larr;
          </button>
          <button
            onClick={() =>
              setCurrentProductNumber((prev) =>
                prev >= similarProducts.length / 3 - 1 ? prev : prev + 1
              )
            }
            style={{
              backgroundColor:
                currentProductNumber < similarProducts.length / 3 - 1
                  ? "#5D37F3"
                  : "",
            }}
          >
            &rarr;
          </button>
        </span>
      </Controller>
      <Container>
        {similarProducts
          .slice(currentProductNumber * 3, currentProductNumber * 3 + 3)
          .map((item: Product) => {
            return (
              <Products key={item.id}>
                <ProductInfo
                  displayActionsModal={true}
                  product={item}
                  id={item.id.toString()}
                  selectedId={(id) => {
                    const selected = similarProducts.find(
                      (product) => product.id.toString() === id
                    );
                    if (selected) {
                      setSelectedProduct(selected);
                    }
                  }}
                />
                <AddProductModal
                  selectedProduct={selectedProduct}
                  closeModal={() => setSelectedProduct(null)}
                />
              </Products>
            );
          })}
      </Container>
    </>
  );
}
