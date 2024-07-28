// src/components/FormField.js
import React from 'react';

const FormField = ({ field, value, error, handleChange }) => {
  const { name, label, type, options } = field;

  switch (type) {
    case 'text':
    case 'password':
    case 'email':
    case 'date':
    case 'number':
      return (
        <div key={name} style={{display: 'flex',justifyContent: 'space-between'}}>
          <label>{label}</label>
          <input name={name} type={type} value={value} onChange={handleChange} />
          {error && <div className="error">{error}</div>}
        </div>
      );
    case 'select':
      return (
        <div key={name} style={{display: 'flex',justifyContent: 'space-between'}}>
          <label>{label}</label>
          <select name={name} value={value} onChange={handleChange}>
            <option value="">Select</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <div className="error">{error}</div>}
        </div>
      );
    case 'checkbox':
      return (
        <div key={name} style={{display: 'flex',justifyContent: 'space-between'}}>
          <label>{label}</label>
          {options.map(option => (
            <label key={option}>
              <input
                name={name}
                type="checkbox"
                value={option}
                checked={value.includes(option)}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
          {error && <div className="error">{error}</div>}
        </div>
      );
    case 'radio':
      return (
        <div key={name} style={{display: 'flex',justifyContent: 'space-between'}}>
          <label>{label}</label>
          {options.map(option => (
            <label key={option}>
              <input
                name={name}
                type="radio"
                value={option}
                checked={value === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
          {error && <div className="error">{error}</div>}
        </div>
      );
    case 'textarea':
      return (
        <div key={name} style={{display: 'flex',justifyContent: 'space-between'}}>
          <label>{label}</label>
          <textarea name={name} value={value} onChange={handleChange} />
          {error && <div className="error">{error}</div>}
        </div>
      );
    default:
      return null;
  }
};

export default FormField;
