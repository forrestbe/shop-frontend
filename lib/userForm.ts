import { useEffect, useState } from 'react';

interface Input {
  [name: string]: string | number
}

export default function useForm(initial = {}): {
  inputs: Input,
  handleChange: (e) => void,
  clearForm: () => void,
  resetForm: () => void
} {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial)
  }, [initialValues]);

  function handleChange(e): void {
    let { value } = e.target;
    const { name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm(): void {
    setInputs(initial);
  }

  function clearForm(): void {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  }
}
