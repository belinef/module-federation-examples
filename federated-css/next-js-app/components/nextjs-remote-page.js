import React from 'react';
import dynamic from 'next/dynamic';
// const RemoteButton = React.lazy(() => import('app3/Button'));
// const StyledButton = React.lazy(() => import('federated_styles/StyledButton'));
// const TailwindButton = React.lazy(() => import('federated_styles/TailwindButton'));
// import classes from 'federated_styles/ButtonStyleCssModule';
// import tailwind from 'federated_styles/TailwindCss';

// import './ButtonContainer.css';
// import('federated_styles/ButtonStyleCss');
// import('federated_styles/ButtonStyleScss');
// import('federated_styles/ButtonStyleLess');
// import('federated_styles/CssVariables');

const variables = dynamic(() => import('federated_styles/ButtonStyleScss'), {
    ssr: false,
});

const classes = dynamic(() => import('federated_styles/ButtonStyleCssModule'), {
    ssr: false,
});
const tailwind = dynamic(() => import('federated_styles/TailwindCss'), {
    ssr: false,
});
const StyledButton = dynamic(() => import('federated_styles/StyledButton'), {
    ssr: false,
});
const TailwindButton = dynamic(() => import('federated_styles/TailwindButton'), {
    ssr: false,
});
const RemoteButton = dynamic(() => import('app3/Button'), {
    ssr: false,
});

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const ButtonContainer = () => (
    <div style={style}>
        NextJs App Container
        <br />
        <br />
        <div className="red-button">  Red className Button Federated Css injected</div>
        <div className="black-button">  Black Button Federated Css variables inject and used in internal css</div>
        <div className="orange-button">  Orange Button Federated Scss injected</div>
        <div className="brown-button">  Brown Button Federated Less injected</div>
        <div className={classes['yellow-button']}>  Yellow Button Federated Css Module  </div>
        <div className={classes['red-button']}>  Red className Button but blue Css Module (classname collision does not affect)</div>
        <React.Suspense fallback="Loading Button">

        </React.Suspense>
        <RemoteButton />
        <StyledButton>  Federated Styled Button </StyledButton>
        <TailwindButton />
        <div className={`${tailwind.btn} ${tailwind['btn-green']}`}> Button with Federated Tailwind css. </div>
    </div>
);

export default ButtonContainer;
