import React from 'react';
import styles from '../styles/LocationDetails.module.css';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({
  breaks: true,
  sanitize: true,
});

export const LocationDetails = ({ location, closeHandler }) => {
  const [markup, setMarkup] = React.useState('');

  const readTextFile = (file) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          setMarkup(allText);
        }
      }
    };
    rawFile.send(null);
  };

  useEffect(() => {
    readTextFile(`./${location.markdown}`);
    markup.replace('coordinates', location.latlong);
    let clean = DOMPurify.sanitize(
      marked.parse(markup.replace(/&#13;/g, '<br>'))
    );
    document.getElementById('preview').innerHTML = clean;
  }, [, markup]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.close} onClick={closeHandler}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='lucide lucide-x'
        >
          <path d='M18 6 6 18' />
          <path d='m6 6 12 12' />
        </svg>
      </span>
      <span className={styles.coordinates}>
        {' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='lucide lucide-map-pin'
        >
          <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
          <circle cx='12' cy='10' r='3' />
        </svg>
        {location.latlong[0]} , {location.latlong[1]}
      </span>
      <div class='container'>
        <div id='preview'></div>
      </div>
      {location.images &&
        location.images.map((image, index) => (
          <div key={index}>
            <span className={styles.imageTitle}>{image.name}</span>
            <img
              src={'./images/' + image.path}
              className={styles.detailsImg}
              alt={image.name}
            />
          </div>
        ))}
    </div>
  );
};
