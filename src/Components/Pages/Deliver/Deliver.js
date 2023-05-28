/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { useParams } from 'react-router-dom';
import AcceptOrder from './AcceptOrder';
import Dashboard from './Dashboard';
import { useEffect } from 'react';

function Deliver() {
    const { id } = useParams();
    useEffect(() => {

    }, [id])
    return (
        <>
            {
                !id ? <Dashboard /> : <AcceptOrder orderId={id} />
            }
        </>
    )
}

export default Deliver