import React from 'react';
import('federated_styles/ButtonStyleCss');
import('federated_styles/ButtonStyleScss');
import './ButtonContainer.scss';
const RemoteButton = React.lazy(() => import('app3/Button'));
const StyledButton = React.lazy(() => import('federated_styles/StyledButton'));
import classes from 'federated_styles/ButtonStyleCssModule';


const style = {
  padding: 12,
  backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
  <div style={style}>
    App 2 Container
    <br />
    <br />
    <div className="red-button"> I'm Red Button </div>
    <div className="black-button"> I'm Black Button Scss in Scss</div>
    <div className="orange-button"> I'm Orange Button Scss</div>
    <div className={classes['yellow-button']}> I'm Yellow Css Module Button </div>
    <div className={classes['red-button']}> I'm Red but blue Css Module Button </div>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
      <StyledButton> I'm Styled Button </StyledButton>
    </React.Suspense>
  </div>
);

export default ButtonContainer;
