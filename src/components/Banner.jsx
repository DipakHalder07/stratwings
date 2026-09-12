import React from 'react';

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-bg"></div>
      <div className="container">
        <div className="banner-content">
          <h1 className="banner-title">
            BOILERPLATED <span className="brands">Brands</span> DESIG
            <span className="latter">
              N
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path
                  d="M14.75 1.97363C15.477 0.00892581 18.2564 0.00892512 18.9834 1.97363L20.8877 7.12109C21.869 9.77314 23.9603 11.8644 26.6123 12.8457L31.7598 14.75C33.7245 15.477 33.7245 18.2564 31.7598 18.9834L26.6123 20.8877C23.9603 21.869 21.869 23.9603 20.8877 26.6123L18.9834 31.7598C18.2564 33.7245 15.477 33.7245 14.75 31.7598L12.8457 26.6123C11.8644 23.9603 9.77314 21.869 7.12109 20.8877L1.97363 18.9834C0.00892512 18.2564 0.00892581 15.477 1.97363 14.75L7.12109 12.8457C9.77314 11.8644 11.8644 9.77314 12.8457 7.12109L14.75 1.97363Z"
                  fill="#FFD905"
                  stroke="black"
                />
              </svg>
            </span>
            <img className="banner-title-bg" src="/image/banner/title-bg.png" alt="title-bg" />
          </h1>

          <img
            className="banner-subtitle"
            src="/image/banner/banner-subtitle.png"
            alt="Landing page design and development for ambitious brands"
          />

          <div className="banner-items">
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item1.png" alt="banner item 1" />
            </div>
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item2.png" alt="banner item 2" />
            </div>
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item3.png" alt="banner item 3" />
            </div>
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item4.png" alt="banner item 4" />
            </div>
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item5.png" alt="banner item 5" />
            </div>
            <div className="banner-item">
              <img className="banner-item-img" src="/image/banner/banner-item6.png" alt="banner item 6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
