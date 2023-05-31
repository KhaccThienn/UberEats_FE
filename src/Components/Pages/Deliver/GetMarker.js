import { Marker } from '@react-google-maps/api'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Geocode from 'react-geocode'

function GetMarker({ address,name }) {
    const [restaurantLocation, setRestaurantLocation] = useState()
    Geocode.setApiKey(process.env.REACT_APP_API_MAP_KEY)
    Geocode.enableDebug()
    const getLocation = (address) => {
        if (address !== '') {
            Geocode.fromAddress(address).then(
                res => {
                    const { lat, lng } = res.results[0].geometry.location
                    const location = {lat: lat, lng: lng}
                    setRestaurantLocation(location)
                },
                err => {
                    return err
                }
            )
        }
    }
    useEffect(()=>{
        getLocation(address);
    },[address])
    return (
        <>
        <Marker position={restaurantLocation} title={name} />
        </>
    )
}

export default GetMarker