import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({varient,children}) {
    return (
        <Alert varient={varient}>
            {children}
        </Alert>
    )
}

export default Message
