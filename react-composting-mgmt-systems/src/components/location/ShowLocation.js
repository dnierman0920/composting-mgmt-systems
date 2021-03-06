import React, { useState, useEffect } from 'react'
import { show } from '../../api/location'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import EditLocationModal from './EditLocationModal';
import DeleteLocationModal from './DeleteLocationModal'
import IndexBinByLocation from '../bin/IndexBinsByLocation';
import OrderModal from '../order/OrderModal';

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

    // create a hook to change if the Delete Modal displays
    const [OrderModalOpen, setOrderModalOpen] = useState(false);

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
            <br></br>
            <div style={{textAlign:'center'}}>
                <h2># {location.id}</h2>
            </div>
            <h2> Location:
                {'  '}
                <Button variant="warning" size='sm' onClick={() => setModalOpen(true)}>
                    Edit
                </Button>
                {'  '}
                <Button variant="danger" size='sm' onClick={() => setDeleteModalOpen(true)}>
                    Delete 
                </Button>
            </h2>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Zip_Code</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{location.street} </td>
                    <td>{location.city}</td>
                    <td>{location.state}</td>
                    <td>{location.zip_code}</td>
                </tr>
                </tbody>
            </table>
            <br></br>
                <h2>Bins: {'  '}
                    <Button variant="success" size='sm' onClick={() => setOrderModalOpen(true)}>
                        Order a Bin 
                    </Button>
                </h2>


            <IndexBinByLocation
                user={user}
                locationId={id}
            />

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

            <OrderModal
                user={user}
                showModal={OrderModalOpen}
                handleClose={() => setOrderModalOpen(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated((prev) => !prev)}
                setModalOpen={() => setOrderModalOpen((prev) => !prev)}
            />
        </>
        )
}


export default ShowLocation