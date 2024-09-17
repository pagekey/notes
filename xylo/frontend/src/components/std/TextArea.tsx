import React from 'react';


interface TextAreaProps {
    id?: any
    onChange?: any
    value?: any
    children?: any
}

export default (props: TextAreaProps) => {
    return (
        <textarea id={props.id} onChange={props.onChange} style={{border: '1px solid black'}}>
            {props.children}
        </textarea>
    )
}
