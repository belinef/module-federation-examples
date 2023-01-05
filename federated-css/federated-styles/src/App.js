import React from 'react';
import './Button.css';
import TailwindButton from './Tailwind-button';

const App = () => (
  <div>
    <h1>Nested</h1>
    <h2>App 3</h2>
    <button className="red-button"> Red Button</button>
    <TailwindButton />
  </div>
);

export default App;
