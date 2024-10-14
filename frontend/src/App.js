import { useState, useEffect } from 'react';  
import ContactList from './components/ContactList';
import CompanyList from './components/CompanyList';  // Import CompanyList component
import Stats from './components/Stats';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [view, setView] = useState('contacts');  // State to toggle between contacts and companies

    // Fetch contacts from the API
    useEffect(() => {
        if (view === 'contacts') {
            fetch('http://localhost/api/contacts')
                .then(response => response.json())
                .then(data => setContacts(data))
                .catch((error) => {
                    console.error('Error fetching contacts:', error);
                });
        }
    }, [view]);  // Refetch only when view changes

    return (
        <div className='page'>
            <h1>Management System</h1>
            
            {/* Toggle between Contacts and Companies */}
            <div className="view-selector">
                <button 
                    className={view === 'contacts' ? 'active' : ''} 
                    onClick={() => setView('contacts')}
                >
                    Manage Contacts
                </button>
                <button 
                    className={view === 'companies' ? 'active' : ''} 
                    onClick={() => setView('companies')}
                >
                    Manage Companies
                </button>
            </div>

            <hr />

            {/* Conditionally render either ContactList or CompanyList */}
            {view === 'contacts' ? (
                <>
                    <ContactList contacts={contacts} setContacts={setContacts} />
                    <p>Click a contact to view associated phone numbers</p>
                </>
            ) : (
                <CompanyList />
            )}

            <Stats />
        </div>
    );
}

export default App;
