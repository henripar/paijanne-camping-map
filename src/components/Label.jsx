import React from 'react';
import styles from '../styles/Label.module.css';

export const Label = (props) => {
  return (
    <div className={styles.label} style={{ background: props.color }}>
      {props.icon && props.icon}
      <span> {props.text.toString()}</span>
    </div>
  );
};
