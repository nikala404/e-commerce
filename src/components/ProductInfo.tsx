import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Product = styled.div`
  max-width: 300px;
  img {
    max-height: 328px;
    height: 328px;
    border-radius: 12px;
    width: 100%;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 22px;
    font-weight: bold;
  }
  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4 {
    color: lightgreen;
    font-size: 18px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: blue;
    cursor: pointer;
  }
  span {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  span button {
    border: none;
    color: lightgreen;
    font-size: 20px;
    cursor: pointer;
    background: white;
    display: flex;
    align-items: center;
  }

  span:hover {
    transition: 0.3s;
    transform: translate(0px, -3px);
    color: red;
  }
`;

export interface ProductInterface {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

interface ProductInfoProps {
  product: ProductInterface;
  id?: string;
  selectedId?: (id: string) => void;
  displayActionsModal?: boolean;
}

export default function ProductInfo({
  product,
  id,
  selectedId,
  displayActionsModal,
}: ProductInfoProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedButtonId = e.currentTarget.id;

    if (selectedId) {
      selectedId(clickedButtonId.toString());
    }
  };

  const navigate = useNavigate();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const idValue = e.currentTarget.id;
    navigate(`/product/${idValue}`);
  };

  return (
    <>
      <Product key={product.id} id="product_div">
        <img src={product.image} alt={product.title} loading="lazy" />
        <Details id="details">
          <h2>{product.title}</h2>
          <h3>Category: {product.category}</h3>
          <div>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {displayActionsModal ? (
            <span>
              Price:
              <h4>${product.price}</h4>
            </span>
          ) : null}

          <p>
            Rating: {product.rating.rate}/5 (Based on {product.rating.count}{" "}
            reviews)
          </p>
          {displayActionsModal ? (
            <ProductActions>
              <a onClick={handleNavigate} id={product.id.toString()}>
                See More
              </a>
              <span>
                Add to Cart
                <button id={id} onClick={handleClick}>
                  +
                </button>
              </span>
            </ProductActions>
          ) : null}
        </Details>
      </Product>
    </>
  );
}
