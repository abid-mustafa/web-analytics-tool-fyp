import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Header.css';

export default function Header({ onDateChange }) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleSubmit = () => {
        if (fromDate && toDate) {
            onDateChange({ from: fromDate, to: toDate });
        } else {
            alert("Please select both From and To dates.");
        }
    };

    return (
        <div className="header">
            <div className="datepicker">
                <label>From: </label>
                <DatePicker
                    selected={fromDate}
                    onChange={(date) => setFromDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                />
            </div>
            <div className="datepicker">
                <label>To: </label>
                <DatePicker
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                />
            </div>
            <button className="submit-btn" onClick={handleSubmit}>Apply</button>
        </div>
    );
}
