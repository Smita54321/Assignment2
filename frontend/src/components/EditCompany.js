import { useState } from 'react';

function EditCompany({ company, updateCompany, setEditingCompany }) {
    const [companyName, setCompanyName] = useState(company.company_name);
    const [companyAddress, setCompanyAddress] = useState(company.company_address);
    const [contactId, setContactId] = useState(company.contact_id);

    const saveCompany = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/companies/${company.company_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
                contact_id: contactId
            }),
        });

        const updatedCompany = await response.json();
        updateCompany(updatedCompany);
        setEditingCompany(null);  // Close the editing form
    };

    return (
        <form className="edit-company" onSubmit={saveCompany}>
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
                onChange={(e) => setContactId(e.target.value)}
                required
            />
            <button type="submit" className="button green">Save Changes</button>
            <button type="button" onClick={() => setEditingCompany(null)} className="button">Cancel</button>
        </form>
    );
}

export default EditCompany;
