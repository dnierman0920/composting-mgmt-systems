import React, { useState, useEffect } from 'react'
import { index } from '../../api/location'
import TableResponsive from '../shared/TableResponsive'
import { Button } from 'react-bootstrap'
import CreateLocationModal from './CreateLocationModal'
import LocationTable from './LocationTable'

const LocationIndex = (props) => {
    // pull the user from the props
    const {user, msgAlert} = props
    
    // create a hook for the locations variable
    const [locations, setLocations] = useState(null)
    //create a hook to change if the create Modal displays
    const [modalOpen, setModalOpen] = useState(false);

    // create a special body for first time users without locations
    const noLocationBody = {
        color: "black",
        // backgroundColor: "DodgerBlue",
        height: "90vh",
        fontFamily: "Arial",
        backgroundColor: "antiquewhite",
        textAlign: 'center'
      };

    useEffect(()=> {
        // use the axios call to pull index info of all locations
        index(user)
        .then((res)=> {
            console.log("RESPONSE: ", res.data.locations)
            setLocations(res.data.locations)
        })

        .catch((error) => {
            console.log("ERROR: ", error)
        })
    },[])

    if (!locations) {
        return <p>loading...</p>
    } else if (locations.length === 0) {
        return(
            <body style={noLocationBody}>
                <br></br>
                <h4> To get started, click on the button below!</h4>
                <br></br>
                <Button variant="warning" onClick={() => setModalOpen(true)}>
                    Add my first location
                </Button>

                <CreateLocationModal 
                    user={user}
                    show={modalOpen}
                    handleClose={() => setModalOpen(false)}
                    msgAlert={msgAlert}
                />
            </body>
        ) 
    }
    
    // return the locations
    // link to render multiple objects in a list: https://reactjs.org/docs/lists-and-keys.html
    console.log("LOCATIONS USED FOR MAPPING: ", locations.locations)
 
    return (
        <>
            <h1>Locations</h1>
        
            <Button variant="warning" onClick={() => setModalOpen(true)}>
                Add Location
            </Button>

            {/* <TableResponsive
                arrayOfObjects={locations}
            /> */}
            
            <LocationTable
                locations={locations}
            />

            <CreateLocationModal 
                user={user}
                show={modalOpen}
                handleClose={() => setModalOpen(false)}
                msgAlert={msgAlert}
                // triggerRefresh={triggerRefresh}
            />
        </>
        )
}


export default LocationIndex