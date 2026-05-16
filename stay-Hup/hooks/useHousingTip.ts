import { useEffect, useState } from 'react';
import { getHousingTip } from '@/services/tipsService';

export function useHousingTip() {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTip();
  }, []);

  const loadTip = async () => {
    try {
      const data = await getHousingTip();
      setTip(data);
    } catch (error) {
      setTip('Check the house location and contact details before booking.');
    } finally {
      setLoading(false);
    }
  };

  return {
    tip,
    loading,
  };
}