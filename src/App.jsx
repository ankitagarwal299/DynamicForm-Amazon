// src/App.js
import React from 'react';
import DynamicForm from './components/DynamicForm';
import formSchema from './formSchema';

const App = () => {
  const handleSubmit = (formValues) => {
    console.log('Form values:', formValues);
  };

  return (
    <div>
      <h1>Dynamic Form</h1>
      <DynamicForm schema={formSchema} onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
