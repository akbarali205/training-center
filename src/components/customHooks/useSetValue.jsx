import React from 'react'

function useSetValue() {

    const [inputValues, setinputValues] = React.useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setinputValues({
          ...inputValues,
          [name]: value,
        });
      };

  return {
    handleChange, inputValues
  }
}

export default useSetValue