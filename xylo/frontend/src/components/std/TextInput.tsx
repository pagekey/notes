import React from 'react';


interface TextInputProps {
    id?: any
    onChange?: any,
    value?: any
    placeholder?: string
}

export default (props: TextInputProps) => {
    return (
        <input
            id={props.id}
            onChange={props.onChange}
            value={props.value}
            style={{border: '1px solid black'}}
            placeholder={props.placeholder}
        />
    )
}
