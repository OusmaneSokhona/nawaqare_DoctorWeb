import { RefObject, useEffect } from "react";

type UseOutsideClick = <T extends HTMLElement, E extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  exceptionRef?: RefObject<E>,
) => void;

const useOutsideClick: UseOutsideClick = (ref, callback, exceptionRef) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref?.current &&
        !ref.current.contains(event.target as Node) &&
        (!exceptionRef?.current ||
          !exceptionRef.current.contains(event.target as Node))
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, exceptionRef]);
};

export default useOutsideClick;
