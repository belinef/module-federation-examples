import React from 'react';
import styles from 'federated_styles/ButtonStyleJss';

const Button = () => {
  const classes = styles();

  return (<div className={classes.button}>App 3 Button</div>);
};

export default Button;
