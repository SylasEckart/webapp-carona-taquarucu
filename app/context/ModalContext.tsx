import { ModalAction, modalReducer, ModalState } from "../reducers/modalReducer";
import { createContextFactory } from "./ContextFactory";


const { Provider: ModalProvider, useContext: useModalContext } = createContextFactory<ModalState, ModalAction>({
    reducer: modalReducer,
    initialState: { isOpen: false },
    displayName: "ModalContext",
  });

export { ModalProvider, useModalContext };
