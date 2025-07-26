import React, { useEffect } from "react";
import s from "./Cart.module.scss";
import { useSelector } from "react-redux";

const Cart = ({ cartMenu, setCartMenu }) => {
  const { cart } = useSelector((state) => state.products);

  return (
    <>
      <div className={s.wrapper} onClick={() => setCartMenu(false)}>
        <div
          className={s.wrapper__box}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={s.wrapper__box_top}>
            <p className={s.wrapper__box_title}>
              {`Cart`} <span>{`(${cart.length})`}</span>
            </p>
            <span onClick={() => setCartMenu(false)}>X</span>
          </div>
          <ul className={s.wrapper__box_carts}>
            {cart &&
              cart.map((item, key) => (
                <li className={s.wrapper__box_cart} key={key}>
                  <img src={item.thumbnail} alt={item.title} width={50} />
                  <div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Cart;
