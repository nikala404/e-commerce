import { useEffect, useState } from "react";
import styled from "styled-components";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProductContainer = styled.div`
  max-width: 280px;
  max-height: 280px;
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
  z-index: 1;
  background-color: white;
  overflow-y: scroll;
`;

const ProductHolder = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 29px 10px;
  border: 1px solid gray;
  border-radius: 15px;
  overflow: hidden;
  white-space: nowrap;
  img {
    max-width: 30px;
  }
`;

const ProductTitle = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface CartProduct {
  img: string;
  title: string;
  price: number;
  fullPrice: number;
  amount: number;
}

export default function Cart() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    let i = JSON.parse(window.localStorage.getItem("cartItems") || "[]");
    setProducts(i);
  }, []);

  console.log(products);

  return (
    <>
      <CartContainer>
        <span
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          Cart{" "}
          <svg
            style={{
              cursor: "pointer",
            }}
            onClick={handleClick}
            fill="#433"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="20px"
            viewBox="0 0 902.86 902.86"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path>{" "}
                  <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </span>
        {isClicked ? (
          <ProductContainer>
            {products.map((item, index) => (
              <ProductHolder key={index}>
                <span>
                  <svg
                    style={{
                      cursor: "pointer",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    fill="#ff0000"
                    height="10px"
                    width="14px"
                    version="1.1"
                    id="Layer_1"
                    viewBox="0 0 492 492"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z" />
                      </g>
                    </g>
                  </svg>
                </span>
                <img src={item.img} />
                <div
                  style={{
                    maxWidth: "160px",
                  }}
                >
                  <ProductTitle>{item.title}</ProductTitle>
                  <ProductTitle>
                    <span style={{ color: "lightgreen" }}>{item.price}$</span> x{" "}
                    <span style={{ color: "red" }}>{item.amount}</span> -{" "}
                    <span style={{ color: "lightgreen" }}>
                      {item.fullPrice}$
                    </span>
                  </ProductTitle>
                </div>
              </ProductHolder>
            ))}

            <span
              style={{
                color: "red",
                cursor: "pointer",
              }}
            >
              Clear
            </span>
          </ProductContainer>
        ) : null}
      </CartContainer>
    </>
  );
}
