import { useHotkeys } from 'react-hotkeys-hook';

interface KeyboardScrollOptions {
  onScrollDown: () => void;
  onScrollUp: () => void;
  disabled?: boolean;
}

export const useKeyboardNavigation = ({
  onScrollDown,
  onScrollUp,
  disabled = false
}: KeyboardScrollOptions) => {
  const options = {
    enabled: !disabled,
    preventDefault: true,
    enableOnFormTags: false
  };

  useHotkeys('down, space, pagedown', onScrollDown, options);
  useHotkeys('up, pageup', onScrollUp, options);
};