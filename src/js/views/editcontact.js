import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [storedContact, setStoredContact] = useState("");
    const { id } = useParams();

    const { store, actions } = useContext(Context);

    useEffect(() => {

        const filteredContact = store.contacts.filter((contact) => {
            console.log(contact);
            return contact.id == params.id
        })
        setStoredContact(filteredContact[0])
        console.log(filteredContact);       
    }, [])
    console.log(storedContact);


    const handleChange = (event) => {
        setStoredContact({...storedContact, [event.target.name] : event.target.value})
    }

    const handleUpdate = (event) => {
        event.preventDefault();

        actions.updateContact(storedContact, navigate)
    };


    return (
        <>
            <h1 className="title text-center mt-5 mb-4">Edit Contact</h1>
            <form className="container w-75 d-grid mb-5" onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label htmlFor="fullnameInput" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" id="fullnameInput" value={storedContact.name} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="mailInput" className="form-label">Mail</label>
                    <input type="email" className="form-control" name="email" id="mailInput" value={storedContact.email} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneInput" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" name="phone" id="phoneInput" value={storedContact.phone} onChange={(e) => handleChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" id="addressInput" value={storedContact.address} onChange={(e) => handleChange(e)} />
                </div>
                <button type="submit" className="btn btn-success float-end mb-5" data-bs-toggle="modal" data-bs-target="#editModal">
                    Save contact
                </button>
            </form>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className={!storedContact.name?.trim() || !storedContact.phone?.trim() ? "modal-title fs-5 text-danger" : "modal-title fs-5 text-success"} id="exampleModalLabel"><strong>{!storedContact.name?.trim() || !storedContact.phone?.trim() ? "Error" : "Edit Contact"}</strong></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {!storedContact.name?.trim() || !storedContact.phone?.trim() ? "Please, fill the Fullname and Phone inputs" : "Contact updated succssesfully"}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/">
                <button className="btn btn-outline-primary">Back to Agenda</button>
            </Link>
        </>
    )
}