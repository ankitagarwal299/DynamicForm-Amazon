// src/components/DynamicForm.js
import React, { useState } from 'react';
import FormField from './FormField';

const DynamicForm = ({ schema, onSubmit }) => {
  const initialState = schema.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? [] : '';
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const field = schema.find(field => field.name === name);
    let error = '';
    if (field.validation) {
      if (field.validation.required && !value) {
        error = 'Required';
      } else if (field.validation.minLength && value.length < field.validation.minLength) {
        error = `Minimum ${field.validation.minLength} characters required`;
      } else if (field.validation.maxLength && value.length > field.validation.maxLength) {
        error = `Maximum ${field.validation.maxLength} characters allowed`;
      } else if (field.validation.pattern && !field.validation.pattern.test(value)) {
        error = 'Invalid format';
      } else if (field.validation.min && value < field.validation.min) {
        error = `Minimum value is ${field.validation.min}`;
      } else if (field.validation.max && value > field.validation.max) {
        error = `Maximum value is ${field.validation.max}`;
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === 'checkbox') {
      newValue = formValues[name].includes(value)
        ? formValues[name].filter(val => val !== value)
        : [...formValues[name], value];
    }

    setFormValues({
      ...formValues,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: validate(name, newValue),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    schema.forEach(field => {
      const error = validate(field.name, formValues[field.name]);
      if (error) {
        formErrors[field.name] = error;
      }
    });
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map(field => (
        <FormField
          key={field.name}
          field={field}
          value={formValues[field.name]}
          error={errors[field.name]}
          handleChange={handleChange}
          
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
