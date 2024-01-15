import { useState } from 'react';

export type ToggleStateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useToggleState = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const close = () => {
    setState(false);
  };

  const open = () => {
    setState(true);
  };

  const toggle = () => {
    setState((state) => !state);
  };

  const hookData = [state, open, close, toggle] as ToggleStateType;
  hookData.state = state;
  hookData.open = open;
  hookData.close = close;
  hookData.toggle = toggle;
  return hookData;
};
