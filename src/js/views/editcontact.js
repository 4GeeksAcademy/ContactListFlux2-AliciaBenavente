import React, { useState, useContext, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = (contact) => {
    const [ name, setName ] = useState ("");
    const [ email, setEmail ] = useState ("");
    const [ phone, setPhone ] = useState ("");
    const [ address, setAddress ] = useState ("");
    const [ storedContact, setStoredContact ] = useState();
    const { id } = useParams();

    const { store, actions } = useContext (Context);

    useEffect (() => {
        setStoredContact(store.contacts.findIndex((contact) => contact.id == id))       
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        
        if(!name?.trim() || !phone?.trim()) {
            // setShowModal(true);
            // setShowCentered(false)
            // alert("Please, fill the Fullname and Phone inputs")
            console.log(updatedContact)
        } else {
            // setShowModal(true);
            // setShowCentered(true);
            const updatedContact = { 
                name,
                email,
                phone,
                address,
                id: contact.id,
             }
        return updatedContact;
        }
    }

    // const handleSave = () => {
    //     if (!name?.trim() || !phone?.trim()) {
    //     if (!alert || alert.type !== 'danger') {
    //         setAlert({ type: 'danger', message: ' Please complete all the fields' });
    //     }} else {
    //     const updatedContact = {
    //         id: contact.id,
    //         name,
    //         email,
    //         phone,
    //         address,
    //     };
    //     onSave(updatedContact);
    // }
    // };



    return (
        <>
        <h1 className="title text-center mt-5 mb-4">Edit Contact</h1>
                <form className="container w-75 d-grid mb-5">
                    <div className="mb-3">
                        <label htmlFor="fullnameInput" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="fullnameInput" value={contact.name} onChange={(e) => setName(e.target.value)} placeholder={store.contacts[storedContact]?.name}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mailInput" className="form-label">Mail</label>
                        <input type="email" className="form-control" id="mailInput" value={contact.email} onChange={(e) => setEmail(e.target.value)} placeholder={store.contacts[storedContact]?.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneInput" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="phoneInput" value={contact.phone} onChange={(e) => setPhone(e.target.value)} placeholder={store.contacts[storedContact]?.phone}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="addressInput" className="form-label">Address</label>
                        <input type="text" className="form-control" id="addressInput" value={contact.address} onChange={(e) => setAddress(e.target.value)} placeholder={store.contacts[storedContact]?.address}/>
                    </div>
                </form>

                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><strong></strong></h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>                        
                            </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={handleUpdate} className="btn btn-success float-end mb-5">
                        Save contact
                    </button>  

        <Link to="/">
            <button className="btn btn-outline-primary">Back to Agenda</button>
        </Link>
        </>
    )
}