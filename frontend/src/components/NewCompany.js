import { useState } from 'react';

function NewCompany({ addCompany }) {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [contactId, setContactId] = useState('');

    const createCompany = async (e) => {
        e.preventDefault();

        console.log('Form values:', {
            company_name: companyName,
            company_address: companyAddress,
            contactId: contactId,
        });

        const response = await fetch('http://localhost:5000/api/companies', {  // Correct port
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
                contactId: contactId  // Ensure this matches your API schema
            }),
        });

        const newCompany = await response.json();
        console.log('API Response:', response);  // Log the full response
        console.log('New Company:', newCompany);  // Log the JSON data returned from the API

        if (response.ok) {
            addCompany(newCompany);  // Append to the company list
        } else {
            console.error('Failed to add company:', newCompany);
        }

        setCompanyName('');
        setCompanyAddress('');
        setContactId('');
    };

    return (
        <form className="new-company" onSubmit={createCompany}>
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company Address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Contact ID"
                value={contactId}
                onChange={(e) => {
                    console.log(e.target.value);  // Check if the contact ID is being typed correctly
                    setContactId(e.target.value);
                }}
                required
            />
            <button type="submit" className="button green">Add Company</button>
        </form>
    );
}

export default NewCompany;
