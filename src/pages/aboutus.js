import styles from "./aboutuspage.module.css";

const AboutUsPage = () => {
  return (
    <div className={styles.aboutUsPage}>
      <h1 className={styles.ourStory}>OUR STORY</h1>
      <p className={styles.teamPara} id="storyPara">
        We're a team of five university students developing a web app that
        simplifies understanding medications. Our app allows users to scan their
        medicine, providing detailed summaries, personalized advice, and
        community support in English and Sinhala.
      </p>
      <h1 className={styles.ourTeam}>OUR TEAM</h1>
      <pre className={styles.teamName}>
        <p className={styles.names}>Nishanthika Paripooranan</p>
        <p className={styles.names}>Panuja Paskkaran</p>
        <p className={styles.names}>Melani Disanayaka</p>
        <p className={styles.names}>Dewni Subasinghe</p>
        <p className={styles.names}>Mohamed Shakeel Vazeer</p>
      </pre>
    </div>
  );
};

export default AboutUsPage;