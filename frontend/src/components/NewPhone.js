import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [number, setNumber] = useState('');
    const [phoneType, setPhoneType] = useState('Home'); // Default to 'Home'

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_type: phoneType,  // Include phone type
                phone_number: number
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setPhoneType('Home'); // Reset to default
    }

    return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select onChange={(e) => setPhoneType(e.target.value)} value={phoneType}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Landline">Landline</option>
                <option value="Mobile">Mobile</option>
            </select>
            <input
                type='text'
                placeholder='Phone Number'
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                required
            />
            <button className='button green' type='submit'>Add Smita's Phone</button>
        </form>
    );
}

export default NewPhone;
