import styled from "styled-components";
import ProductInfo from "./ProductInfo";
import { Product } from "../desktop_page_components/MainContent";
import { useState, useContext } from "react";
import { CartProduct } from "./Cart";
import { toast } from "react-toastify";
import { ProductContext } from "../App";

const Container = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 10px;
  background-color: white;
  padding: 10px 50px 20px 50px;
  border-radius: 10px;

  svg {
    cursor: pointer;
  }

  input {
    text-align: center;
    height: 28px;
    max-width: 50px;
    border: 1px solid gray;
    border-radius: 8px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductAdditionPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const CloseButton = styled.svg``;

const AddToCartButton = styled.button`
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: lightgreen;
  color: white;
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  span {
    display: flex;
    align-items: center;
  }
`;

export default function AddProductModal({
  selectedProduct,
  closeModal,
}: {
  selectedProduct: Product | null;
  closeModal: any;
}) {
  const [amount, setAmount] = useState<number>(1);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };
  const { addedProducts, setAddedProducts } = useContext(ProductContext);

  const addToCart = () => {
    if (selectedProduct && amount > 0) {
      const existingCartItems: CartProduct[] = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );
      const existingItemIndex = existingCartItems.findIndex(
        (item) => item.title === selectedProduct.title
      );

      if (existingItemIndex !== -1) {
        existingCartItems[existingItemIndex].amount += amount;
      } else {
        existingCartItems.push({
          img: selectedProduct.image,
          title: selectedProduct.title,
          price: selectedProduct.price,
          amount: amount,
          fullPrice: amount * Number(selectedProduct.price),
        });
      }

      setAddedProducts(() => [...existingCartItems]);
      localStorage.setItem("cartProducts", JSON.stringify(existingCartItems));
      toast.success("Product added to cart");
      closeModal(false);
    } else {
      toast.error("Amount must be greater than 0");
    }
  };

  return (
    <>
      {selectedProduct && closeModal && (
        <Container>
          <div>
            <Modal id="modal_window">
              <ModalHeader>
                <h2>Add Product</h2>
                <span>
                  <CloseButton
                    onClick={() => {
                      closeModal(false);
                      setAmount(1);
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
                  </CloseButton>
                </span>
              </ModalHeader>

              <ProductInfo
                displayActionsModal={false}
                product={selectedProduct}
              />

              <ProductAdditionPanel>
                <div>
                  <span>Amount: </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleInput}
                    min={1}
                    max={1000}
                  />
                </div>
                <Price>
                  Price:{" "}
                  <span style={{ color: "lightgreen" }}>
                    {amount > 0
                      ? Number(selectedProduct.price) * amount
                      : selectedProduct.price}
                    $
                  </span>
                </Price>
              </ProductAdditionPanel>
              <AddToCartButton
                onClick={() => {
                  addToCart();
                }}
              >
                Add To Cart
              </AddToCartButton>
            </Modal>
          </div>
        </Container>
      )}
    </>
  );
}
