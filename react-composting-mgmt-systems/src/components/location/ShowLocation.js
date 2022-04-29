import React, { useState, useEffect } from 'react'
import { show } from '../../api/location'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import EditLocationModal from './EditLocationModal';
import DeleteLocationModal from './DeleteLocationModal'

const ShowLocation = (props) => {
    // pull the user from the props
    const {user, msgAlert} = props;
    // pull the id from the url
    const { id } = useParams();
    
    // create a hook for the locations variable
    const [location, setLocation] = useState(null)

    //create a hook to change if the Edit Modal displays
    const [modalOpen, setModalOpen] = useState(false);

    // create a hook to change if the Delete Modal displays
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    //create a boolean hook to reloads/updates page every time it changed
    const [updated, setUpdated] = useState(false);

    useEffect(()=> {
        // use the axios call to pull location based on ID
        show(user, id)
        .then((res)=> {
            console.log("RESPONSE: ", res.data.location)
            setLocation(res.data.location)
        })

        .catch((error) => {
            console.log("ERROR: ", error)
        })
    },[updated])

    if (!location) {
        return <p>loading...</p>
    } else if (location.length === 0) {
        return <p>No location here</p>
    }
    
    // return the locations
    // link to render multiple objects in a list: https://reactjs.org/docs/lists-and-keys.html
    console.log("LOCATIONS USED FOR MAPPING: ", location.locations)
 
    return (
        <>
            <h2>Location {location.id}</h2>
            <Button variant="warning" onClick={() => setModalOpen(true)}>
                Edit Location
            </Button>

            <Button variant="warning" onClick={() => setDeleteModalOpen(true)}>
                Delete Location
            </Button>

            <p>STREET: {location.street}</p>
            <p>CITY: {location.city} </p>
            <p>STATE: {location.state} </p>
            <p>ZIP_CODE{location.zip_code} </p>

            <EditLocationModal
                user={user}
                showModal={modalOpen}
                handleClose={() => setModalOpen(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated((prev) => !prev)}
                setModalOpen={() => setModalOpen((prev) => !prev)}
            />
            <DeleteLocationModal
                user={user}
                showModal={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                msgAlert={msgAlert}
                location={location}
            />
        </>
        )
}


export default ShowLocation