import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./DetailPage.scss";
import Loader from "../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, ProductsDetail } from "../store/products/productsSlice";

const DetailPage = () => {
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductsDetail(id));
  }, [id]);

  if (!productDetail) return <Loader />;

  return (
    <div className="product-detail">
      <div className="product-detail__left">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="product-detail__slider"
        >
          {productDetail.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`product-${index}`}
                className="product-detail__slide-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="product-detail__right">
        <h2>{productDetail.title}</h2>
        <p className="product-detail__price">${productDetail.price}</p>
        <p>{productDetail.description}</p>

        <div className="product-detail__extra">
          <p>
            <strong>Brand:</strong> {productDetail.brand}
          </p>
          <p>
            <strong>Category:</strong> {productDetail.category}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {productDetail.rating}
          </p>
          <p>
            <strong>Discount:</strong> {productDetail.discountPercentage}%
          </p>
          <p>
            <strong>Stock:</strong> {productDetail.stock} items
          </p>
        </div>

        <div className="product-detail__right__box">
          <button
            className="product-detail__right__box_btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              dispatch(addToCart(productDetail));
            }}
          >
            Add to Cart
          </button>
          <Link
            to="/"
            className="product-detail__right__box_btn"
          >
            Back to Main
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
