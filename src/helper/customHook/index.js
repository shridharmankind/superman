import {useState, useEffect} from 'react';
import {Helper} from 'database';

/**
 *  Hook to get staff position id from database
 */
export function useStaffPositionID() {
  const [staffPositionId, setStaffPositionId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await Helper.getStaffPositionId();
      setStaffPositionId(2);
    })();
  }, []);
  return staffPositionId;
}
