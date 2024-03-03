import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSearchTextClick = useCallback(() => {
    navigate("/search-page");
  }, [navigate]);
  
  // const onCommunityTextClick = useCallback(() => {
  //   //TODO: Discord API
  // }, []);

  const onAboutUsTextClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  const onTranslateButtonClick = useCallback(() => {
    //TODO: Translate API
  }, []);

  return (
    <div className={styles.navigationBar}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <img className={styles.medscan2Icon} alt="" src="/icon.png" />
          <b className={styles.medscan}>MedScan</b>
        </div>
        <div className={styles.frame}>
          <div className={styles.pages}>
            <div className={styles.homepage} onClick={onHomeTextClick}> Home </div>
            <div className={styles.searchpage} onClick={onSearchTextClick}> Search </div>
            <a className={styles.community} href="https://discord.gg/75BRfzmJ83" target="_blank" rel="noopener noreferrer"> Community </a>
            <div className={styles.aboutus} onClick={onAboutUsTextClick}> About Us </div>
          </div>
          <button className={styles.translateButton} onClick={onTranslateButtonClick}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
