import { loadPyodide } from 'pyodide';

const testPyodide = async () => {
  try {
    const pyodide = await loadPyodide();
    console.log('Pyodide loaded successfully');
  } catch (error) {
    console.error('Failed to load Pyodide', error);
  }
};

testPyodide();
