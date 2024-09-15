import React from 'react';


interface ButtonProps {
    onClick?: any,
    children: any
}

export default (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} style={{backgroundColor: 'blue', borderRadius: '5px', padding: '5px', color: 'white'}}>
            {props.children}
        </button>
    )
}
