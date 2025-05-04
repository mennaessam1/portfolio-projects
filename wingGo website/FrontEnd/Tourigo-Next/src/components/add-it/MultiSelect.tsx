import React, { useState } from "react";
import { CMultiSelect } from '@coreui/react-pro';
import styles from './MultiSelect.module.css'; // Import the CSS module

export const MultiSelect = () => {
    const options = [
        { value: 0, label: 'Angular', selected: true },
        { value: 1, label: 'Bootstrap' },
        { value: 2, label: 'React.js' },
        { value: 3, label: 'Vue.js' },
        {
            label: 'backend',
            options: [
                { value: 4, label: 'Django' },
                { value: 5, label: 'Laravel' },
                { value: 6, label: 'Node.js' }
            ]
        }
    ];

    return (
        <div className={styles.container}> {/* Apply styles to scope CoreUI CSS */}
            <CMultiSelect
                options={options}
                label="Framework"
                text="Please select your framework."
                search={false}
            />
        </div>
    );
};

export default MultiSelect;
