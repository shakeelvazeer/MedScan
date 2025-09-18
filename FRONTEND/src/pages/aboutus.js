import React, { useState, useEffect, useRef } from 'react';
import styles from "../styles/aboutuspage.module.css";

import nishanthika from "../images/team/nishanthika.jpg";
import melani from "../images/team/melani.jpg";
import dewni from "../images/team/dewni.jpg";
import panuja from "../images/team/panuja.jpg";
import shakeel from "../images/team/shakeel.jpeg";

const AboutUsPage = () => {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsGalleryVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    const galleryElement = galleryRef.current;
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  return (
    <div className={styles.aboutUsPage}>
      <h1 className={styles.ourStory}>Our Story</h1>
      <p className={styles.teamPara} id="storyPara">
        We're a team of five university students developing a web app that
        simplifies understanding medications. Our app allows users to scan their
        medicine, providing detailed summaries, personalized advice, and
        community support in English, Sinhala, and Tamil.
      </p>
      <section ref={galleryRef} className={styles.galleryContainer}>
        <div className={`${styles.galleryContainerHidden} ${isGalleryVisible ? styles.show : ''} ${styles.gallery}`}>
        <a target="_blank" rel="noopener noreferrer" href={nishanthika}>
            <img src={nishanthika} alt="Nishanthika"/>
          </a>
          <div className={styles.descArea}>
            <div className={styles.nameDesc}>Nishanthika Paripooranan</div>
            <div className={styles.idDesc}>20201270</div>
            <div className={styles.idDesc}>w1840126</div>
          </div>
        </div>

        <div className={`${styles.galleryContainerHidden} ${isGalleryVisible ? styles.show : ''} ${styles.gallery}`}>
          <a target="_blank" rel="noopener noreferrer" href={melani}>
            <img src={melani} alt="Melani"/>
          </a>
          <div className={styles.descArea}>
          <div className={styles.nameDesc}>Melani Disanayaka</div>
          <div className={styles.idDesc}>20201277</div>
          <div className={styles.idDesc}>w1839528</div>
          </div>
        </div>

        <div className={`${styles.galleryContainerHidden} ${isGalleryVisible ? styles.show : ''} ${styles.gallery}`}>
          <a target="_blank" rel="noopener noreferrer" href={dewni}>
            <img src={dewni} alt="Dewni"/>
          </a>
          <div className={styles.descArea}>
            <div className={styles.nameDesc}>Dewni Subasinghe</div>
            <div className={styles.idDesc}>20201293</div>
            <div className={styles.idDesc}>w1839508</div>
          </div>
        </div>

        <div className={`${styles.galleryContainerHidden} ${isGalleryVisible ? styles.show : ''} ${styles.gallery}`}>
          <a target="_blank" rel="noopener noreferrer" href={panuja}>
            <img src={panuja} alt="Panuja"/>
          </a>
          <div className={styles.descArea}>
            <div className={styles.nameDesc}>Panuja Paskkaran</div>
            <div className={styles.idDesc}>20201267</div>
            <div className={styles.idDesc}>w1839500</div>
          </div>
        </div>

        <div className={`${styles.galleryContainerHidden} ${isGalleryVisible ? styles.show : ''} ${styles.gallery}`}>
          <a target="_blank" rel="noopener noreferrer" href={shakeel}>
            <img src={shakeel} alt="Shakeel"/>
          </a>
          <div className={styles.descArea}>
            <div className={styles.nameDesc}>Shakeel Vazeer</div>
            <div className={styles.idDesc}>20200269</div>
            <div className={styles.idDesc}>w1810998</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
