import React, { useEffect, useState } from "react";
import s from "./Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  getProducts,
} from "../../store/products/productsSlice";
import { getCategories, getCurrentCategory } from "../../store/categoryList/categoryListSlice";

const Filter = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [price, setPrice] = useState(100);
  const [sort, setSort] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "sort") {
      setSort(e.target.value);
    }
  };

  const clear = () => {
    setPrice(1000);
    setSort("");
    setActiveCategory("All Products");
    dispatch(
      filterProducts({ category: "All Products", price: 1000, sort: "" })
    );
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(filterProducts({ category: activeCategory, price, sort }));
    dispatch(getCurrentCategory(activeCategory));
  }, [price, sort, activeCategory]);

  return (
    <>
      <div className={s.filter}>
        <div className={s.filter__category}>
          <h3 className={s.filter__title}>Browse by</h3>
          <div className={s.filter__category_box}>
            <div
              className={`${s.filter__category_item} ${
                activeCategory === "All Products" ? s.active : ""
              }`}
              onClick={() => {
                setActiveCategory("All Products"), dispatch(getProducts(""));
              }}
            >
              All Products
            </div>
            {categories &&
              categories.map((category, i) => (
                <div
                  key={i}
                  className={`${s.filter__category_item} ${
                    activeCategory === category ? s.active : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </div>
              ))}
          </div>
        </div>
        <div className={s.filter__sort}>
          <h3 className={s.filter__title}>Sort by</h3>
          <form className={s.filter__sort_box} onChange={handleChange}>
            <div className={s.filter__sort_item}>
              <input
                type="radio"
                name="sort"
                id="asc"
                value="asc"
                checked={sort === "asc"}
                onChange={handleChange}
              />
              <label htmlFor="asc">Name A-Z</label>
            </div>
            <div className={s.filter__sort_item}>
              <input
                type="radio"
                name="sort"
                id="desc"
                value="desc"
                checked={sort === "desc"}
                onChange={handleChange}
              />
              <label htmlFor="desc">Name Z-A</label>
            </div>
          </form>
        </div>
        <div className={s.filter__price}>
          <h3 className={s.filter__title}>Filter by</h3>
          <div className={s.filter__price_range}>
            <div className={s.filter__price_range_title}>
              Price <span>up to ${price}</span>
            </div>
            <div className={s.filter__price_range_progress}>
              <input
                type="range"
                min="1"
                max="1000"
                className={s.filter__price_range_slider}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                id="myRange"
              />
            </div>
          </div>
        </div>
        {price <= 990 || sort ? (
          <button className={s.filter__btn} onClick={() => clear()}>
            clear
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Filter;
