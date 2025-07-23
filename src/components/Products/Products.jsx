import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProducts } from "../../store/products/productsSlice";
import s from "./Products.module.scss";

const Products = ({ search }) => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getProducts(search));
  }, [search]);

  return (
    <>
      <div className={s.products}>
        {products && products.map((products) => (
          <div className={s.products__item} key={products.id}>
            <div className={s.products__item_box}>
              <img
                className={s.products__item_thumbnail}
                src={products.thumbnail}
                alt="ig"
              />
              <p className={s.products__item_description}>
                {products.description}
              </p>
            </div>
            <div className={s.products__item_content}>
              <h4 className={s.products__item_title}>
                {products.title}
              </h4>
              <p className={s.products__item_price}>
                ${products.price}
              </p>
              <button className={s.products__item_btn} onClick={() => dispatch(addToCart(products.title))}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
