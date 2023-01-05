import React from 'react';
import tailwind from './tailwind.module.css';

const Button = () => (<div className={`${tailwind.btn} ${tailwind['btn-blue']}`}> Federated button styled with Tailwind</div>);

export default Button;
