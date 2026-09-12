import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RunningLine from './RunningLine';

const PLANS = [
  {
    name: 'Packaging',
    price: '1 000',
    subtitle: 'Timeline: 7-15 business days',
    subtitleBg: '/image/plan/plan-card-subtitle-bg1.png',
    description: [
      '2-3 packaging design concepts',
      'Visualization on mockups',
      'Print-ready files (PDF, AI)',
      'Up to 2 rounds of revisions',
      'Support with print'
    ]
  },
  {
    name: 'Logotype',
    price: '1 600',
    subtitle: 'Timeline: 7 business days',
    subtitleBg: '/image/plan/plan-card-subtitle-bg2.png',
    description: [
      '2–3 initial logo concepts',
      'Finalization of selected version',
      'Files for web and print (SVG, PNG, EPS)',
      'Up to 2 rounds of revisions',
      'Mini brand usage guide'
    ]
  },
  {
    name: 'Brand identity',
    price: '4 000',
    subtitle: 'Timeline: 14-25 business days',
    subtitleBg: '/image/plan/plan-card-subtitle-bg3.png',
    description: [
      '3 brand concept directions',
      'Full brand guidelines & typography',
      'Logo suite + icon set',
      'Packaging or merchandise kit',
      'Support with print & digital assets'
    ]
  }
];

function PlanCard({ name, subtitle, subtitleBg, description, price, onClick }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center']
  });

  const slideY = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);

  return (
    <div className="plan-card" ref={cardRef}>
      <img className="plan-card-header" src="/image/plan/plan-card-header-bg.png" alt="header" />
      <div className="plan-card-printing">
        <motion.div
          className="plan-card-content"
          style={{ y: slideY, transformOrigin: 'top center' }}
        >
          <img className="plan-card-content-bg" src="/image/plan/plan-card-bg.png" alt="card-bg" />
          <h3 className="plan-card-title">{name}</h3>
          <span className="plan-card-subtitle">
            <p>{subtitle}</p>
            <img className="plan-card-subtitle-bg" src={subtitleBg} alt="subtitle-bg" />
          </span>
          <div className="plan-card-list">
            <ul>
              {description.map((item, idx) => (
                <li key={idx}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" fill="#000" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClick} className="button yellow plan-card-button">
            <span className="button-content">Get started</span>
          </button>
          <div className="plan-card-revisions">
            <p className="plan-card-revisions-text">Hourly rate for extra revisions $30/hour</p>
          </div>
          <div className="plan-card-price">
            <span>from</span>
            <p>${price}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Plan({ onOpenContact }) {
  return (
    <section className="plan" id="plan">
      <div className="container">
        <div className="plan-content">
          <h2 className="plan-title">
            Pick <span className="brands"> The </span>Perfect <br />
            Design Pla<span className="latter">n</span>
            <img className="plan-title-bg" src="/image/plan/plan-title-bg.png" alt="title-bg" />
          </h2>

          <div className="plan-wrapper">
            {PLANS.map((plan, idx) => (
              <PlanCard
                key={idx}
                name={plan.name}
                subtitle={plan.subtitle}
                subtitleBg={plan.subtitleBg}
                description={plan.description}
                price={plan.price}
                onClick={onOpenContact}
              />
            ))}
          </div>

          <div className="plan-meet">
            <img className="plan-meet-bg" src="/image/plan/plan-meet-bg.png" alt="meet-bg" />
            <h2 className="plan-meet-title">
              <span className="text">
                New <span className="brands">Here? </span>
                <br />
                Let'<span className="latter">s</span> meet
              </span>
              <img className="plan-meet-title-bg" src="/image/plan/plan-card-meet-bg-mobile.png" alt="meet-bg" />
            </h2>
            <button onClick={onOpenContact} className="button pink-big plan-meet-button">
              <div className="button-content">Start the conversation. First consultation is free and friendly</div>
            </button>
          </div>
        </div>
      </div>

      <RunningLine />
    </section>
  );
}
