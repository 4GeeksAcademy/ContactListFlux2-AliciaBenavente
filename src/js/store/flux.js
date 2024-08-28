
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {

			checkAgenda: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado`, {
					method: "GET"
				})
				  .then(response => {
					if (response.status === 404) {
						getActions().createAgenda();
						
					} else {
						getActions().getContacts();
					}
						return response.json();
				  })
				  .then(data => {
					console.log(data);
					
				  })
				  .catch(error => {
						console.error("Agenda exist", error);
				  });
			},
			createAgenda: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado`, {
					method: "POST"
				})
				  .then(response => {
						return response.json();
				  })
				  .then(data => {
						console.log(data);
				  })
				  .catch(error => {
						console.error("Agenda exist", error);
				  });
			},
			getContacts: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts`, {
					method: "GET"
				})
				.then(response => {
					if (response.ok) {
						console.log(response)
						return response.json();
					} else {
						throw new Error ("Couldn't fetch the Agenda");
					};
					})
				.then(data => {
					console.log(data)
					const store = getStore();
					setStore({...store, contacts: data.contacts,});
					return data
					})
				.catch(error => {
						console.error("Error fetching Contacts", error);
					});
			},

			addContact: (newContact, navigate) => {
				fetch("https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					  },
					body: JSON.stringify(newContact)
				})
				.then(response =>  {
					return response.json()
				})
				.then(data => {
					const store = getStore();
					setStore({ contacts: [data, ...store.contacts]})					
				})
				.catch(error => {
					console.error("Error adding contact", error)
				})
				navigate("/");
			},

			deleteContact: (id) => {
				console.log(id)
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts/${id}`, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json'
					  },
					redirect: "follow",
				})
				.then(response =>  {	
					if(response.ok)	{			
					console.log(response);
					response.text()
					}
				})
				.then(data => {
					console.log("Data", data);
					getActions().getContacts();
				})
				.catch(error => {
					console.error("Error deleting contact", error)
				})
			},

			updateContact: (contact, navigate) => {
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts/${contact.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contact),
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
					getActions().getContacts();
					
				})
				.catch(error => {
					console.error("Error updating the contact info", error);
				});
				navigate("/");
			},			
		}
	};
};

export default getState;
