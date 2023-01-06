import React from 'react';
import('federated_styles/ButtonStyleCss');
import('federated_styles/ButtonStyleScss');
import('federated_styles/ButtonStyleLess');
import('federated_styles/CssVariables');
import './ButtonContainer.css';
const RemoteButton = React.lazy(() => import('app3/Button'));
const StyledButton = React.lazy(() => import('federated_styles/StyledButton'));
const TailwindButton = React.lazy(() => import('federated_styles/TailwindButton'));
import classes from 'federated_styles/ButtonStyleCssModule';
import tailwind from 'federated_styles/TailwindCss';

const style = {
  padding: 12,
  backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
  <div style={style}>
    React App Container
    <br />
    <br />
    <div className="red-button">  Red className Button Federated Css injected</div>
    <div className="black-button">  Black Button Federated Css variables inject and used in internal css</div>
    <div className="orange-button">  Orange Button Federated Scss injected</div>
    <div className="brown-button">  Brown Button Federated Less injected</div>
    <div className={classes['yellow-button']}>  Yellow Button Federated Css Module  </div>
    <div className={classes['red-button']}>  Red className Button but blue Css Module (classname collision does not affect)</div>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
      <StyledButton>  Federated Styled Button </StyledButton>
      <TailwindButton />
    </React.Suspense>
      <div className={`${tailwind.btn} ${tailwind['btn-green']}`}> Button with Federated Tailwind css. </div>
  </div>
);

export default ButtonContainer;
