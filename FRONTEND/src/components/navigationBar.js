import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navigationbar.module.css";
import medScanLogo from "../images/icons/medscan.png";


const NavigationBar = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSearchTextClick = useCallback(() => {
    navigate("/search-page");
  }, [navigate]);
 
  const onAboutUsTextClick = useCallback(() => {
    navigate("/about-us");
  }, [navigate]);

  return (
    <div className={styles.navigationBar}>
        <div className={styles.logo}>
          <img className={styles.medscanIcon} alt="logo" src={medScanLogo} />
          <b className={styles.medscanTxt}>MedScan</b>
        </div>
          <div className={styles.pages}>
            <div className={styles.pages} onClick={onHomeTextClick}> Home </div>
            <div className={styles.pages} onClick={onSearchTextClick}> Search </div>
            <a className={styles.pages} href="https://discord.gg/75BRfzmJ83" target="_blank" rel="noopener noreferrer"> Community </a>
            <div className={styles.pages} onClick={onAboutUsTextClick}> AboutUs </div>
          </div>
    </div>
  );
};

export default NavigationBar;
