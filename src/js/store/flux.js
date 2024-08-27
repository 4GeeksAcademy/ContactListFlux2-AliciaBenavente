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
						console.error("Error fetching Agenda", error);
					});
			},

			addContact: (newContact) => {
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
			},

			deleteContact: (contactId) => {
				fetch("https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts" + contactId, {
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json'
					  },
					redirect: "follow",
					body: JSON.stringify(newContact)
				})
				.then(response =>  {
					console.log(response)
				})
				.then(data => {
					console.log(data);
					const contacts = store.contacts.filter((contact) => contact.id !== contactId);
					setStore({ contacts: contacts });
				})
				.catch(error => {
					console.error("Error deleting contact", error)
				})
			},

			updateContact: (updatedContact) => {
				fetch(`https://playground.4geeks.com/contact/agendas/ElefanteDescuartizado/contacts/${updatedContact.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(updatedContact)
				})
				.then(resp => resp.json())
				.then(data => {
					console.log(data);
					const store = getStore();
					const updatedContacts = store.contacts.map(contact => 
						contact.id === updatedContact.id ? updatedContact : contact
					);
					setStore({ contacts: updatedContacts });
				})
				.catch(error => {
					console.error("Error updating the contact info", error);
				});
			},			
		}
	};
};

export default getState;
