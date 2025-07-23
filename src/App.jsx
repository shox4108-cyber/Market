import { useDispatch, useSelector } from "react-redux";
import cart from "../public/images/cartIcon.svg";
import Filter from "./components/Filter/Filter";
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";
import Products from "./components/Products/Products";
import { getProducts } from "./store/products/productsSlice";
import Cart from "./components/Cart/Cart";

function App() {
  const { currentCategory } = useSelector((state) => state.category);
  const [search, setSearch] = useState("");
  const { products, cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [cartMenu, setCartMenu] = useState(false);

  useEffect(() => {
    dispatch(getProducts(""));
  }, []);

  return (
    <>
      {cartMenu ? <Cart cartMenu={cartMenu} setCartMenu={setCartMenu} /> : ""}
      <div className="wrapper">
        {!products ? (
          <Loader />
        ) : (
          <div className="container">
            <div className="wrapper__box">
              <Filter />
              <div className="wrapper__cart">
                <div className="wrapper__cart-top">
                  <h1 className="wrapper__cart-title">{currentCategory}</h1>
                  <div className="wrapper__cart-top-right">
                    <div className="wrapper__cart-top-input">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          height="25px"
                          width="25px"
                        >
                          <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            stroke="#fff"
                            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                          ></path>
                          <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            stroke="#fff"
                            d="M22 22L20 20"
                          ></path>
                        </svg>
                      </button>
                      <input
                        placeholder="search.."
                        name="text"
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                      />
                    </div>
                    <svg
                    onClick={() => setCartMenu(!cartMenu)}
                      width="50"
                      className="wrapper__cart-top-icon"
                      height="35"
                      viewBox="0 0 60 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{cursor: 'pointer'}}
                    >
                      <path
                        d="M55 13L50 30H20L10 5H0V0H12L22 25H46L50 13H55Z"
                        fill="white"
                      />
                      <circle cx="22" cy="38" r="4" fill="white" />
                      <circle cx="44" cy="38" r="4" fill="white" />
                      <text
                        x="35"
                        y="18"
                        textAnchor="middle"
                        fontFamily="var(--font-family)"
                        fontSize="20"
                        fill="white"
                        fontWeight="450"
                      >
                        {cart.length}
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="wrapper__cart-bottom">
                  <Products search={search} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
