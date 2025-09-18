import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styles from "../styles/searchpage.module.css";
import uploadIcon from "../images/icons/medscan.png";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const medicineOptions = [
  { value: 'Amoxicillin 500 MG', label: 'Amoxicillin' },
  { value: 'Atomoxetine 25 MG', label: 'Atomoxetine' },
  { value: 'Apixaban 2.5 MG', label: 'Apixaban' },
  { value: 'Aprepitant 80 MG', label: 'Aprepitant' },
  { value: 'Calcitriol 0.00025 MG', label: 'Calcitriol' },
  { value: 'Benzonatate 100 MG', label: 'Benzonatate' },
  { value: 'Carvedilol 3.125 MG', label: 'Carvedilol',},
  { value: 'Celecoxib 200 MG', label: 'Celecoxib'},
  { value: 'Duloxetine 30 MG', label: 'Duloxetine'},
  { value: 'Eltrombopag 25 MG', label: 'Eltrombopag'},
  { value: 'Montelukast 10 MG', label: 'Montelukast'},
  { value: 'Mycophenolate mofetil 250 MG', label: 'Mycophenolate mofetil'},
  { value: 'Oseltamivir 45 MG', label: 'Oseltamivir' },
  { value: 'Pantoprazole 40 MG', label: 'Pantoprazole'},
  { value: 'Pitavastatin 1 MG', label: 'Pitavastatin'},
  { value: 'Prasugrel 10 MG', label: 'Prasugrel' },
  { value: 'Ramipril 5 MG', label: 'Ramipril' },
  { value: 'Saxagliptin 5 MG', label: 'Saxagliptin'},
  { value: 'Sitagliptin 50 MG', label: 'Sitagliptin'},
  { value: 'Tadalafil 5 MG', label: 'Tadalafil'},
];

const SearchPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const searchPill = async (filter) => {
    const url = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-ahmhw/endpoint/data/v1/action/find';
    const apiKey = 'iBtdDbB2LOZSzpWyBgXVuv3lzgHNCCRqHqFQF05gqDi3VbOpbEMCNSeAy0BE7ibx';
    const requestBody = {
      collection: 'pills_info',
      database: 'medscan_db',
      dataSource: 'MedScan',
      filter,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ejson',
          'Accept': 'application/json',
          'api-key': apiKey,
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch data');
      return null;
    }
  };

  const handleChange = (selectedOption) => {
    setInput(selectedOption.value);
    handleSearch(selectedOption.value);
  };

  const handleSearch = (query) => {
    searchPill({ name: query })
      .then(response => {
        const documents = response.documents;
        const matchedPill = documents.find(doc => doc.name === query);
        if (matchedPill) {
          const { name, quick_summary, chemical_composition, uses, side_effects, image_url } = matchedPill; // Use matchedPill here
          navigate('/summary-page', {
            state: {
              data: {
                name,
                quick_summary,
                chemical_composition,
                uses,
                side_effects,
                image_url
              }
            }
          });
        }
      })
      .catch(error => {
        console.error('Error searching for pill:', error);
      });
  };
 
 

  const handleSearchImage = () => {
    const imgView = document.getElementById('img-view');
    const backgroundImage = imgView.style.backgroundImage;
  
    if ((!backgroundImage || backgroundImage === 'none')) {
      alert('Please upload an image before searching.');
      return;
    }
  
    const formData = new FormData();
    const fileInput = document.getElementById('input-file');
    formData.append('image', fileInput.files[0]);
  
    fetch('https://medscan-backend-t7mjv53jma-uc.a.run.app/predict', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    })
    .then(data => {
      // Assuming the response contains the name of the pill
      const pillName = data.name;
     // alert(`The pill name is: ${pillName}`);
     setInput(pillName);
     handleSearch(pillName);
    })
    .catch(error => {
      console.error('Error searching for pill:', error);
      alert('Failed to fetch data');
    });
  };


  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    try {
      const imgLink = URL.createObjectURL(event.target.files[0]);
      document.getElementById('img-view').style.backgroundImage = `url(${imgLink})`;
      document.getElementById('img-view').textContent = '';
      document.getElementById('img-view').style.border = 'none';
    }
    catch (error) {
      console.error("Failed to create object URL:", error);
    }
  };

  const resetImage = () => {
    document.getElementById('input-file').value = '';
    document.getElementById('img-view').style.backgroundImage = 'none';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    document.getElementById('input-file').files = event.dataTransfer.files;
    uploadImage(event);
  };

  return (
    <div className={styles.searchpage}>
      <div className={styles.searchContainer}>
        <Select
          className={styles.searchContainerWrapper}
          placeholder="Search By Pill Keyword"
          value={medicineOptions.find(option => option.value === input)}
          onChange={handleChange}
          options={medicineOptions}
        />
      </div>

      <div className={styles.upload}> 
      <label htmlFor="input-file" className={styles.dropArea} onDrop={handleDrop} onDragOver={handleDragOver}>
          <input type="file" accept="image/*" id="input-file" onChange={uploadImage} hidden />
          <div id="img-view" className={styles.imgView}>
            <img src={uploadIcon} alt="upload icon" className={styles.icon} />
            <p className={styles.uploadtext}>Upload Your Image Here</p>
          </div>
        </label>
        <div className={styles.bin}>
          <IconButton aria-label="delete" size="large" onClick={resetImage}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
       </div>

      <div className={styles.searchButtonSet}>
  
        <Button variant="contained" size="large" onClick={handleSearchImage}>Image Search</Button>
      </div>
    </div>
  );
};

export default SearchPage;
