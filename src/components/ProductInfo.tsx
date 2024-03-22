import { styled } from "styled-components";

const Product = styled.div`
  max-width: 300px;
  img {
    max-height: 328px;
    min-height: 328px;
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
  }
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

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <>
      <Product key={product.id}>
        <img src={product.image} alt={product.title} loading="lazy" />
        <Details>
          <h2>{product.title}</h2>
          <h3>Category: {product.category}</h3>
          <p>Description: {product.description}</p>
          <span>
            Price:
            <h4>${product.price}</h4>
          </span>
          <p>
            Rating: {product.rating.rate}/5 (Based on {product.rating.count}{" "}
            reviews)
          </p>
          <ProductActions>
            <a href="#">See More</a>
            <span>
              Add to Cart
              <button>+</button>
            </span>
          </ProductActions>
        </Details>
      </Product>
    </>
  );
}
