import React from 'react';


interface TextAreaProps {
    id?: any
    onChange?: any
    value?: any
    children?: any
    placeholder?: string
}

export default (props: TextAreaProps) => {
    return (
        <textarea
            id={props.id}
            onChange={props.onChange}
            style={{border: '1px solid black'}}
            placeholder={props.placeholder}
        >
            {props.children}
        </textarea>
    )
}
