import {
  useEffect,
  useLayoutEffect,
  EffectCallback,
  DependencyList
} from "react";

/**
 * A hook that provides a consistent interface for effects across server and client environments.
 * Uses useLayoutEffect on the client for synchronous updates, and useEffect on the server to avoid warnings.
 *
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 * @returns void
 *
 * @example
 * ```tsx
 * useIsomorphicLayoutEffect(() => {
 *   // Your effect code here
 *   return () => {
 *     // Your cleanup code here
 *   };
 * }, [dependency1, dependency2]);
 * ```
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Type definition for the useIsomorphicLayoutEffect hook
 * Matches the React.EffectHook type
 */
export type UseIsomorphicLayoutEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => void;

/**
 * Default export for convenience
 */
export default useIsomorphicLayoutEffect;
