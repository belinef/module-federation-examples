import React, {useEffect} from 'react';
import './Button.css';
import './Button.styles.less';
import './Button.styles.scss';
import './variables.css';
import './tailwind-global.css';
import tailwindClasses from './tailwind.module.css';
import classes from './Button.styles.module.css';

const CombinedStylesWorkaround = function (props) {
    useEffect(() => {
        props.extractCssModules({
            tailwind: tailwindClasses,
            classes,
        });
    }, []);
    return (<span></span>)
};

export default CombinedStylesWorkaround;
