import { useEmotionCss } from '@ant-design/use-emotion-css';
import React from 'react'

export default function index() {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            verticalAlign: 'middle',
            width: "3px",
            background: token.colorPrimaryActive,
            marginRight: "5px",
            borderRadius: "20px"
        };
    });
    return (
        <i className={langClassName}>&nbsp;</i>
    )
}
