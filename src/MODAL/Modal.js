import React, { } from 'react';
import './Modal.css';

const modal = props => {
    return (
            <div
                className='Modal'
                style={{
                    transform: props.open ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.open ? '1' : '0'
                }}>
                {props.children}
            </div>
    );

};

export default modal