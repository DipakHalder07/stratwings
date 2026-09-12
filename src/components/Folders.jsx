import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { boldLinesOne, lineTwo, lineOne } from '../assets/lottie/animations';
import {
  FolderNamingIcon,
  FolderLogoIcon,
  FolderAnimationIcon,
  FolderBrandingIcon,
  FolderPackIcon,
  Folder3DIcon,
  Folder2DIcon
} from './FolderIcons';

function FolderItem({ size = 'sw-big', context, title, autoplay, lottie }) {
  return (
    <div className={`sw-folders-item ${size}`}>
      {lottie && <Lottie className="sw-folders-item-lottie" animationData={lottie} />}
      <img className="sw-folders-item-under" src="/image/folders/folder-main-big.png" alt="folder-bottom" />
      <img className={`sw-folders-item-context ${autoplay ? 'sw-autoplay' : ''}`} src={context} alt="folder-context" />
      <img className="sw-folders-item-main" src="/image/folders/folder-ander-big.png" alt="folder-top" />
      {title}
    </div>
  );
}

export default function Folders() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 7);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="sw-folders">
      <div className="sw-container">
        <div className="sw-folders-content">
          <h2 className="sw-folders-title">
            Our <span className="sw-brands">Studio</span> Specialize<span className="sw-latter">S</span>
            <br />
            in thi<span className="sw-latter">S</span>
            <img className="sw-folders-title-bg" src="/image/folders/folders-title-bg.png" alt="title-bg" />
            <Lottie className="sw-folders-title-lottie" animationData={boldLinesOne} />
          </h2>

          <div className="sw-folders-wrapper">
            <FolderItem
              size="sw-big"
              title={<FolderNamingIcon />}
              context="/image/folders/context/folder-context1.png"
              autoplay={activeIdx === 0}
              lottie={lineTwo}
            />
            <FolderItem
              size="sw-small"
              title={<FolderLogoIcon />}
              context="/image/folders/context/folder-context2.png"
              autoplay={activeIdx === 1}
            />
            <FolderItem
              size="sw-small"
              title={<FolderAnimationIcon />}
              context="/image/folders/context/folder-context3.png"
              autoplay={activeIdx === 2}
            />
            <FolderItem
              size="sw-small"
              title={<FolderBrandingIcon />}
              context="/image/folders/context/folder-context4.png"
              autoplay={activeIdx === 3}
            />
            <FolderItem
              size="sw-big"
              title={<FolderPackIcon />}
              context="/image/folders/context/folder-context5.png"
              autoplay={activeIdx === 4}
              lottie={boldLinesOne}
            />
            <FolderItem
              size="sw-small"
              title={<Folder3DIcon />}
              context="/image/folders/context/folder-context6.png"
              autoplay={activeIdx === 5}
              lottie={lineOne}
            />
            <FolderItem
              size="sw-big"
              title={<Folder2DIcon />}
              context="/image/folders/context/folder-context7.png"
              autoplay={activeIdx === 6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
