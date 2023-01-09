import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import './ButtonContainer.css';

const StyledButton = dynamic(() => import('federated_styles/StyledButton'), {
    ssr: false,
});
const TailwindButton = dynamic(() => import('federated_styles/TailwindButton'), {
    ssr: false,
});
const CombinedStylesWorkaround = dynamic(() => import('federated_styles/CombinedStyles'), {
    ssr: false,
});

const style = {
    padding: 12,
    backgroundColor: '#cccccc',
};

const ButtonContainer = () => {
    const [isShown, setIsShown] = useState(false);
    const [cssModules, setCssModules] = useState(null);


    function extractCssModules(a) {
        setCssModules(a);
    }

    function activateWorkaround() {
        setIsShown(true);
    }


    return (
        <div style={style}>
            NextJs App Container
            <br />
            <br />
            <h1>Supported</h1>
            <div className="black-button-no-var">  Black Button internal Css imported</div>
            <React.Suspense fallback="Loading Button">
                <StyledButton>  Federated Styled Button </StyledButton>
                <TailwindButton />
            </React.Suspense>

            <br />
            <br />
            <h1>With workaround</h1>
            <button onClick={activateWorkaround} className="black-button-no-var">  Activate workaround </button>
            <br />
            <br />
            <div className="red-button">  Red className Button Federated Css injected</div>
            <div className="black-button">  Black Button Federated Css variables inject and used in internal css</div>
            <div className="orange-button">  Orange Button Federated Scss injected</div>
            <div className="brown-button">  Brown Button Federated Less injected</div>
            <div className="btn btn-green"> Button with Federated Tailwind css as global. </div>

            {isShown && (
                <CombinedStylesWorkaround extractCssModules={extractCssModules}/>
            )}

            {cssModules
                && (<div className={`${cssModules.classes.yellowButton}`}>  Yellow Button Federated Css Module  </div>)
            }
            {cssModules
                    && (<div className={`${cssModules.tailwind.btn} ${cssModules.tailwind.btnGreen}`}> Button with Federated Tailwind css as module. </div>)
            }
            {cssModules
                    && (<div className={cssModules.classes.redButton}>  Red className Button but blue Css Module (classname collision does not affect)</div>)
            }
        </div>
    )
};

export default ButtonContainer;
