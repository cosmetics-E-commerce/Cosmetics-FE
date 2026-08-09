import { createContext, useContext } from "react";

export type MotionContextValue = {
  reducedMotion: boolean;
  finePointer: boolean;
};

export const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  finePointer: false,
});

export function useMotionPreferences() {
  return useContext(MotionContext);
}
