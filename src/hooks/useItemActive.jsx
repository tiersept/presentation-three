import { useAtom } from 'jotai';
import { itemActiveAtom } from '@/store/itemActive';

export const useItemActive = () => {
  const [itemActive, setItemActive] = useAtom(itemActiveAtom);

  const setItemInactive = () => {
    setItemActive(null);
  };

  return { isActive: !!itemActive, itemActive, setItemActive, setItemInactive };
};
