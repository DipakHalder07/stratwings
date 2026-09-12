import React from 'react';

export default function About() {
  return (
    <section id="about" className="sw-about">
      <div className="sw-container">
        {/* Desktop Video Presentation */}
        <div className="sw-about-content">
          <video
            className="sw-about-video"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
          >
            <source src="/video/about-team-new-safari.mp4" type='video/mp4; codecs="hvc1"' />
            <source src="/video/about-team-new.webm" type="video/webm" />
            Your browser does not support videos.
          </video>
        </div>

        {/* Mobile Presentation */}
        <div className="sw-about-content-mobile">
          <h2 className="sw-about-content-mobile-title">
            about <span className="sw-the">The</span>TEA<span className="sw-latter">M</span>
            <img className="sw-about-content-mobile-title-bg" src="/image/about/title-bg.png" alt="title-bg" />
          </h2>
          <img src="/image/about/about-mobile1.png" className="sw-page sw-page-first" alt="about page" />
          <img src="/image/about/about-mobile2.png" className="sw-page" alt="about page" />
          <img src="/image/about/about-mobile3.png" className="sw-page" alt="about page" />
        </div>
      </div>
    </section>
  );
}
