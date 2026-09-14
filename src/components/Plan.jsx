import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RunningLine from './RunningLine';
import PlanBarcode from './PlanBarcode';
import PlanBulletIcon from './PlanBulletIcon';

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
    offset: ['20% end', '40% center']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);

  return (
    <div className="sw-plan-card" ref={cardRef}>
      <img className="sw-plan-card-header" src="/image/plan/plan-card-header-bg.png" alt="header" />
      <div className="sw-plan-card-printing">
        <motion.div
          className="sw-plan-card-content"
          style={{ y, transformOrigin: 'top center' }}
        >
          <img className="sw-plan-card-content-bg" src="/image/plan/plan-card-bg.png" alt="card-bg" />
          <h3 className="sw-plan-card-title">{name}</h3>
          <span className="sw-plan-card-subtitle">
            <p>{subtitle}</p>
            <img className="sw-plan-card-subtitle-bg" src={subtitleBg} alt="subtitle-bg" />
          </span>
          <div className="sw-plan-card-list">
            <ul>
              {description.map((item, idx) => (
                <li key={idx}>
                  <PlanBulletIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={onClick} className="sw-button sw-yellow sw-plan-card-button">
            <span className="sw-button-content">Get started</span>
          </button>
          <div className="sw-plan-card-revisions">
            <p className="sw-plan-card-revisions-text">Hourly rate for extra revisions $30/hour</p>
            <PlanBarcode />
          </div>
          <div className="sw-plan-card-price">
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
    <section className="sw-plan" id="plan">
      <div className="sw-container">
        <div className="sw-plan-content">
          <h2 className="sw-plan-title">
            Pick <span className="sw-brands"> The </span>Perfect <br />
            Design Pla<span className="sw-latter">n</span>
            <img className="sw-plan-title-bg" src="/image/plan/plan-title-bg.png" alt="title-bg" />
          </h2>

          <div className="sw-plan-wrapper">
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

          <div className="sw-plan-meet">
            <img className="sw-plan-meet-bg" src="/image/plan/plan-meet-bg.png" alt="meet-bg" />
            <h2 className="sw-plan-meet-title">
              <span className="sw-text">
                New <span className="sw-brands">Here? </span>
                <br />
                Let'<span className="sw-latter">s</span> meet
              </span>
              <img className="sw-plan-meet-title-bg" src="/image/plan/plan-card-meet-bg-mobile.png" alt="meet-bg" />
            </h2>
            <button onClick={onOpenContact} className="sw-button sw-pink-big sw-plan-meet-button">
              <div className="sw-button-content">Start the conversation. First consultation is free and friendly</div>
            </button>
          </div>
        </div>
      </div>

      <RunningLine />
    </section>
  );
}
