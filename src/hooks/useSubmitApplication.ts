import { API } from '@/assets';
import { useState } from 'react';

export const useSubmitApplication = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitApplication = async (firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(API.SUBMIT_APPLICATION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: firstName + lastName }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitApplication, isLoading };
};
