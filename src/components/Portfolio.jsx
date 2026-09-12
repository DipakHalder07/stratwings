import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Lottie from 'lottie-react';
import { lineOne, lineTwo, boldLinesOne } from '../assets/lottie/animations';
import 'swiper/css';

const GROUPS = [
  {
    name: 'pet',
    title: 'pet care',
    start: 0,
    bg: '/image/portfolio/portfolio-btn1.png',
    bgHover: '/image/portfolio/portfolio-btn1-hover.png'
  },
  {
    name: 'food',
    title: 'food & beverage',
    start: 4,
    bg: '/image/portfolio/portfolio-btn2.png',
    bgHover: '/image/portfolio/portfolio-btn2-hover.png'
  },
  {
    name: 'health',
    title: 'health & wellness',
    start: 8,
    bg: '/image/portfolio/portfolio-btn3.png',
    bgHover: '/image/portfolio/portfolio-btn3-hover.png'
  },
  {
    name: 'lifestyle',
    title: 'lifestyle & eco',
    start: 12,
    bg: '/image/portfolio/portfolio-btn4.png',
    bgHover: '/image/portfolio/portfolio-btn4-hover.png'
  }
];

const ALL_ITEMS = [
  // Pet
  { img: '/image/portfolio/page-pet/item1.png', category: 'pet', lottie: lineOne, lottieClass: 'sw-lottie-pet-one' },
  { img: '/image/portfolio/page-pet/item2.png', category: 'pet' },
  { img: '/image/portfolio/page-pet/item3.png', category: 'pet', lottie: boldLinesOne, lottieClass: 'sw-lottie-pet-two' },
  { img: '/image/portfolio/page-pet/item4.png', category: 'pet' },
  // Food
  { img: '/image/portfolio/page-food/item1.png', category: 'food', lottie: boldLinesOne, lottieClass: 'sw-lottie-food-one' },
  { img: '/image/portfolio/page-food/item2.png', category: 'food' },
  { img: '/image/portfolio/page-food/item3.png', category: 'food' },
  { img: '/image/portfolio/page-food/item4.png', category: 'food', lottie: lineTwo, lottieClass: 'sw-lottie-food-two' },
  // Health
  { img: '/image/portfolio/page-health/item1.png', category: 'health' },
  { img: '/image/portfolio/page-health/item2.png', category: 'health' },
  { img: '/image/portfolio/page-health/item3.png', category: 'health', lottie: lineOne, lottieClass: 'sw-lottie-health-one' },
  { img: '/image/portfolio/page-health/item4.png', category: 'health', lottie: boldLinesOne, lottieClass: 'sw-lottie-health-two' },
  // Lifestyle
  { img: '/image/portfolio/page-lifestyle/item1.png', category: 'lifestyle' },
  { img: '/image/portfolio/page-lifestyle/item2.png', category: 'lifestyle', lottie: lineTwo, lottieClass: 'sw-lottie-lifestyle-one' },
  { img: '/image/portfolio/page-lifestyle/item3.png', category: 'lifestyle', lottie: boldLinesOne, lottieClass: 'sw-lottie-lifestyle-two' },
  { img: '/image/portfolio/page-lifestyle/item4.png', category: 'lifestyle' }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('pet');
  const swiperRef = useRef(null);

  const handleGroupClick = (group) => {
    setActiveTab(group.name);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(group.start, 800);
      swiperRef.current.swiper.autoplay?.start();
    }
  };

  return (
    <section className="sw-portfolio" id="portfolio">
      <div className="sw-container">
        <div className="sw-portfolio-content">
          <h2 className="sw-portfolio-title">
            <span className="sw-brands">Our</span> Portfolio
            <img className="sw-portfolio-title-bg" src="/image/portfolio/portfolio-title-bg.png" alt="title-bg" />
          </h2>

          <div className="sw-portfolio-buttons">
            {GROUPS.map((group) => (
              <button
                key={group.name}
                className={`sw-portfolio-button ${activeTab === group.name ? 'sw-active' : ''}`}
                onClick={() => handleGroupClick(group)}
              >
                <img src={group.bg} alt="bg" />
                <span>{group.title}</span>
                <img src={group.bgHover} alt="bg-hover" />
              </button>
            ))}
          </div>

          <div className="sw-portfolio-buttons-mobile">
            {GROUPS.map((group) => (
              <button
                key={`m-${group.name}`}
                className={`sw-portfolio-button ${activeTab === group.name ? 'sw-active' : ''}`}
                onClick={() => handleGroupClick(group)}
              >
                <img src={group.bg} alt="bg" />
                <span>{group.title}</span>
                <img src={group.bgHover} alt="bg-hover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sw-portfolio-pages">
        <img className="sw-portfolio-cord" src="/image/portfolio/portfolio-cord.png" alt="cord" />
        <img className="sw-portfolio-cord-mobile" src="/image/portfolio/portfolio-cord.png" alt="cord" />

        <Swiper
          ref={swiperRef}
          className="sw-portfolio-pages-swiper"
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={4000}
          allowTouchMove={true}
          grabCursor={true}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 15 },
            768: { slidesPerView: 2.8, spaceBetween: 24 },
            1200: { slidesPerView: 4, spaceBetween: 30 }
          }}
          onSlideChange={(swiper) => {
            const currentIdx = swiper.realIndex % 16;
            let cat = 'pet';
            if (currentIdx < 4) cat = 'pet';
            else if (currentIdx < 8) cat = 'food';
            else if (currentIdx < 12) cat = 'health';
            else cat = 'lifestyle';
            setActiveTab(cat);
          }}
        >
          {ALL_ITEMS.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className={`sw-portfolio-page-item sw-item-${idx % 4}`}>
                <div className="sw-portfolio-page-item-img-wrapper">
                  <img
                    className="sw-portfolio-page-item-img"
                    src={item.img}
                    alt={`portfolio item ${idx + 1}`}
                    style={{
                      '--delay': `${(idx % 4) * 0.2}s`,
                      '--duration': `${0.9 + (idx % 4) * 0.2}s`
                    }}
                  />
                  {item.lottie && (
                    <Lottie
                      animationData={item.lottie}
                      className={item.lottieClass}
                      loop={true}
                      autoplay={true}
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
