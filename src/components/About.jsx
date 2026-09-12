import React from 'react';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        {/* Desktop Video Presentation */}
        <div className="about-content">
          <video
            className="about-video"
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
        <div className="about-content-mobile">
          <h2 className="about-content-mobile-title">
            about <span className="the">The</span>TEA<span className="latter">M</span>
            <img className="about-content-mobile-title-bg" src="/image/about/title-bg.png" alt="title-bg" />
          </h2>
          <img src="/image/about/about-mobile1.png" className="page page-first" alt="about page" />
          <img src="/image/about/about-mobile2.png" className="page" alt="about page" />
          <img src="/image/about/about-mobile3.png" className="page" alt="about page" />
        </div>
      </div>
    </section>
  );
}
