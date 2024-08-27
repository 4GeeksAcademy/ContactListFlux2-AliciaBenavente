import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/newContact.css";
// import { func } from "prop-types";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    // const [ showModal, setShowModal ] = useState(false);
    // const [ showCentered, setShowCentered ] = useState (false);
    const [ newContact, setNewContact] = useState ({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const navigate = useNavigate();

    const submitChanges = (event) => {
        event.preventDefault();

        const { name, phone } = newContact;
        
        if(!name.trim() || !phone.trim()) {
            // setShowModal(true);
            // setShowCentered(false)
            // alert("Please, fill the Fullname and Phone inputs")
            console.log(newContact)
        } else {
            // setShowModal(true);
            // setShowCentered(true);
            actions.addContact(newContact, () => {
                setTimeout(() => navigate("/"))}, 2000);
        }
    };
        return (
            <>
                <h1 className="title text-center mt-5 mb-4">Add New Contact</h1>
                <form className="container w-75 d-grid mb-5">
                    <div className="mb-3">
                        <label htmlFor="fullnameInput" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="fullnameInput" value={newContact.name} onChange={(e) => setNewContact({...newContact, name: e.target.value})} placeholder="Peter Anderson"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mailInput" className="form-label">Mail</label>
                        <input type="email" className="form-control" id="mailInput" value={newContact.email} onChange={(e) => setNewContact({...newContact, email: e.target.value})} placeholder="panderson@gmail.com"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneInput" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="phoneInput" value={newContact.phone} onChange={(e) => setNewContact({...newContact, phone: e.target.value})} placeholder="123456478"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="addressInput" className="form-label">Address</label>
                        <input type="text" className="form-control" id="addressInput" value={newContact.address} onChange={(e) => setNewContact({...newContact, address: e.target.value})} placeholder="87 Madison St"/>
                    </div>
                    <div className="mb-3 ">
                        <button type="button" onClick={submitChanges} className="btn btn-success float-end mb-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Save contact
                        </button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel"><strong>{!newContact.name.trim() || !newContact.phone.trim() ? "Error" : "New Contact"}</strong></h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            {!newContact.name.trim() || !newContact.phone.trim() ? "Please, fill the Fullname and Phone inputs" : "Contact added succssesfully"}
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
                </form>
            </>      
        ) 
    }