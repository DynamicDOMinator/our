'use client';

let lenisInstance = null;

// Function to set the Lenis instance
export const setLenisInstance = (instance) => {
  lenisInstance = instance;
};

// Function to get the Lenis instance
export const getLenisInstance = () => {
  return lenisInstance;
};

// Function to scroll to a specific element by ID
export const scrollToSection = (id) => {
  if (!lenisInstance) {
    console.warn('Lenis instance not available');
    return;
  }
  
  const element = document.getElementById(id);
  if (element) {
    lenisInstance.scrollTo(element);
  } else {
    console.warn(`Element with id '${id}' not found`);
  }
};

// Function to scroll to a specific element
export const scrollToElement = (element) => {
  if (!lenisInstance || !element) {
    console.warn('Lenis instance or element not available');
    return;
  }
  
  lenisInstance.scrollTo(element);
};

// Function to scroll to a specific position
export const scrollToPosition = (position) => {
  if (!lenisInstance) {
    console.warn('Lenis instance not available');
    return;
  }
  
  lenisInstance.scrollTo(position);
};