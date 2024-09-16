import React from 'react';


interface LinkProps {
    href: string
    children: any
}
export default (props: LinkProps) => {
    return (
        <a href={props.href} style={{textDecoration: "underline"}}>{props.children}</a>
    )
}
