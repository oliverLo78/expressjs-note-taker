// Helper function to generate a UUID
module.exports = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0; // Random number between 0 and 15
      const v = c === 'x' ? r : (r & 0x3) | 0x8; // Set the version bits for UUID v4
      return v.toString(16); // Convert to hexadecimal
    });
  };