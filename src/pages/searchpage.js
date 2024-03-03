import React, { useState } from 'react';
import styles from "./searchpage.module.css";

const SearchPage = () => {
  const uploadImage = (event) => {
    const imgLink = URL.createObjectURL(event.target.files[0]);
    document.getElementById('img-view').style.backgroundImage = `url(${imgLink})`;
    document.getElementById('img-view').textContent = '';
    document.getElementById('img-view').style.border = 'none';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    document.getElementById('input-file').files = event.dataTransfer.files;
    uploadImage(event);
  };

  const [input, setInput] = useState('');
  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    // actions to be done with the search input
    console.log("Search button clicked! Searching for:", input);
  };

  return (
    <div className={styles.searchpage}>

      <div className={styles.hero}>
      <label htmlFor="input-file" className={styles.dropArea} onDrop={handleDrop} onDragOver={handleDragOver}>
        <input type="file" accept="image/*" id="input-file" onChange={uploadImage} hidden />
        <div id="img-view" className={styles.imgView}>
          <img src="icon.png" alt="upload icon" className={styles.icon} />
          <p className={styles.uploadtext}>Upload Your Image Here</p>
        </div>
      </label>
      </div>

        <div className={styles.searchContainer}>
          <input className={styles.searchContainerWrapper} type="text" placeholder="Search By Keyword"value={input} onChange={handleChange}/>
        </div>  

        <button onClick={handleSearch} className={styles.searchButton}>
          <div className={styles.searchButtonTxt}>Search</div>
          </button>
    </div>
  );
};

export default SearchPage;
