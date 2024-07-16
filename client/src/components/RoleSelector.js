import React, { useState } from 'react';
import YouthForm from './YouthForm'; // Import YouthForm component
import PatronForm from './PatronForm'; // Import PatronForm component

const RoleSelector = () => {
    const [role, setRole] = useState('');

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <div className="role-selector-container">
            <h2>Select Your Role</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="youth"
                        checked={role === 'youth'}
                        onChange={handleRoleChange}
                    />
                    Enroll as a Youth
                </label>
                <label>
                    <input
                        type="radio"
                        value="patron"
                        checked={role === 'patron'}
                        onChange={handleRoleChange}
                    />
                    Enroll as a Patron
                </label>
            </div>
            {role === 'youth' && <YouthForm />}
            {role === 'patron' && <PatronForm />}
        </div>
    );
};

export default RoleSelector;
