//All global states enter here
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAddress: "",
});

export { useGlobalState, setGlobalState, getGlobalState };
