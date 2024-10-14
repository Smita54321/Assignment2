import { useState, useEffect } from 'react';
import NewCompany from './NewCompany';
import EditCompany from './EditCompany';

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [editingCompany, setEditingCompany] = useState(null);

    // Fetch companies from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error fetching companies:', error));
    }, []);

    // Delete company by ID
    const deleteCompany = async (company_id) => {
        const confirmed = window.confirm('Are you sure you want to delete this company?');
        if (!confirmed) return;

        await fetch(`http://localhost:5000/api/companies/${company_id}`, {
            method: 'DELETE',
        });

        // Remove company from the list
        setCompanies(companies.filter(company => company.company_id !== company_id));
    };

    // Add a new company to the list
    const addCompany = (company) => {
        setCompanies([...companies, company]);
    };

    // Update company in the list
    const updateCompany = (updatedCompany) => {
        setCompanies(companies.map(company => (
            company.company_id === updatedCompany.company_id ? updatedCompany : company
        )));
    };

    return (
        <div className="company-list">
            <h2>Company Management</h2>
            <NewCompany addCompany={addCompany} />
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Contact ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.company_id}>
                            <td>{company.company_name}</td>
                            <td>{company.company_address}</td>
                            <td>{company.contactId}</td>
                            <td>
                                <button onClick={() => setEditingCompany(company)}>Edit</button>
                                <button onClick={() => deleteCompany(company.company_id)} className="button red">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* If editing a company, display the EditCompany component */}
            {editingCompany && <EditCompany company={editingCompany} updateCompany={updateCompany} setEditingCompany={setEditingCompany} />}
        </div>
    );
}

export default CompanyList;
