import { useContext } from "react";
import Header from "../desktop_page_components/Header";
import { ProductContext } from "../App";
import styled from "styled-components";
import { toast } from "react-toastify";

const Parent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: hidden;
  padding: 30px;
  width: 62.5rem;
  img {
    max-width: 46px;
    height: auto;
  }
`;
const ProductWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 29px 10px;
  border: 1px solid gray;
  border-radius: 15px;

  img {
    max-width: 30px;
  }

  button {
    background: e1e8ee;
    color: black;
    padding: 5px 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
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

const ProductQuantityAdjustment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  button {
    border: none;
    background: #e1e8ee;
    border-radius: 5px;
    color: black;
    cursor: pointer;
  }
`;
const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PriceInfo = styled.div``;

const CategoryInfo = styled.div`
  color: #003256;
`;

export default function FullCart() {
  const { addedProducts, setAddedProducts } = useContext(ProductContext);

  const removeFromCart = (title: string) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.title !== title)
    );
  };

  const clearCart = () => {
    setAddedProducts([]);
  };

  const increment = (title: string) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.title === title && product.amount >= 1
          ? { ...product, amount: (product.amount || 0) + 1 }
          : product
      )
    );
  };

  const decrement = (title: string) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.title === title && product.amount && product.amount > 1
          ? { ...product, amount: product.amount - 1 }
          : product
      )
    );
  };

  return (
    <>
      <Header />
      <Parent>
        <Container>
          {addedProducts.map((item) => (
            <ProductWrapper key={item.id}>
              <ProductHolder>
                <CartItem>
                  <span
                    onClick={() => removeFromCart(item.title)}
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
                  <div style={{ maxWidth: "190px" }}>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductTitle>
                      <PriceInfo>
                        <span style={{ color: "lightgreen" }}>
                          {item.price}$
                        </span>{" "}
                        x <span style={{ color: "red" }}>{item.amount}</span> -{" "}
                        <span style={{ color: "lightgreen" }}>
                          {item.price * item.amount}$
                        </span>
                      </PriceInfo>
                      <CategoryInfo>
                        <span>{item.category}</span>{" "}
                      </CategoryInfo>
                    </ProductTitle>
                  </div>
                </CartItem>
                <ProductQuantityAdjustment>
                  <button onClick={() => increment(item.title)}>+</button>
                  <button onClick={() => decrement(item.title)}>-</button>
                </ProductQuantityAdjustment>
                <button
                  onClick={() => {
                    removeFromCart(item.title);
                    toast.success("Purchase Successful");
                  }}
                >
                  Buy
                </button>
              </ProductHolder>
            </ProductWrapper>
          ))}
          {addedProducts.length > 0 && (
            <CartActions>
              <CartCleaner onClick={clearCart}>Clear</CartCleaner>
            </CartActions>
          )}
        </Container>
      </Parent>
    </>
  );
}
