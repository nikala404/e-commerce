import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export interface CartProduct {
  title: string;
  price: number;
  fullPrice: number;
  amount: number;
  category: string;
  description: string;
  id: number;
  image: string;
  rating: { rate: number; count: number };
}

interface ProductDisplayProps {
  products: CartProduct[];
  removeFromCart?: (title: string) => void;
  clearCart?: () => void;
}

const ProductContainer = styled.div`
  max-width: 280px;
  max-height: 280px;
  position: absolute;
  top: calc(100% + 20px);
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
  &::-webkit-scrollbar {
    display: none;
  }
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

const CartActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartCleaner = styled.span`
  color: red;
  cursor: pointer;
`;
const SeeMore = styled.span`
  color: #0099ff;
  cursor: pointer;
`;

export default function CartProductDisplay({
  products,
  removeFromCart,
  clearCart,
}: ProductDisplayProps) {
  const navigate = useNavigate();

  return (
    <ProductContainer>
      {products.map((item, index) => (
        <ProductHolder key={index}>
          <span
            onClick={() => removeFromCart && removeFromCart(item.title)}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#ff0000"
              height="10px"
              width="14px"
              version="1.1"
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
          <img src={item.image} alt={item.title} />
          <div style={{ maxWidth: "160px" }}>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductTitle>
              <span style={{ color: "lightgreen" }}>{item.price}$</span> x{" "}
              <span style={{ color: "red" }}>{item.amount}</span> -{" "}
              <span style={{ color: "lightgreen" }}>
                {item.price * item.amount}$
              </span>
            </ProductTitle>
          </div>
        </ProductHolder>
      ))}
      {products.length > 0 ? (
        <CartActions>
          <CartCleaner onClick={clearCart}>Clear</CartCleaner>
          <SeeMore onClick={() => navigate("/cart")}>SeeMore</SeeMore>
        </CartActions>
      ) : null}
    </ProductContainer>
  );
}
