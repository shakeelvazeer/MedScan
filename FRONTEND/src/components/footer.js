import styles from "./footer.module.css";

const Footer = () => {

  return (
    <div className={styles.footer}>
        <div className={styles.details}>
          <h3 className={styles.copyright}>© Copyright 2024. MedScan. All rights reserved.</h3>
        </div>
    </div>
  );
};

export default Footer;
