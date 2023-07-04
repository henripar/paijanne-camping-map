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
    readTextFile(`../public/${location.markdown}`);
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

      <div class='container'>
        <div id='preview'></div>
      </div>
      {location.images &&
        location.images.map((image, index) => (
          <div key={index}>
            <span className={styles.imageTitle}>{image.name}</span>
            <img
              src={'../public/images/' + image.path}
              className={styles.detailsImg}
              alt={image.name}
              style={{ width: '80%' }}
            />
          </div>
        ))}
    </div>
  );
};
