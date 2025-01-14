export interface ModalState {
    isOpen: boolean;
    title?: string;
    content?: React.ReactNode;
  }
  
  enum ModalActionType {
    OPEN_MODAL = "OPEN_MODAL",
    CLOSE_MODAL = "CLOSE_MODAL",
  }
  
  export type ModalAction = 
    | { type: ModalActionType.OPEN_MODAL; payload: { title: string; content: React.ReactNode } }
    | { type: ModalActionType.CLOSE_MODAL };
  
  export const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
    switch (action.type) {
      case "OPEN_MODAL":
        return {...state, isOpen: true, ...action.payload };
      case "CLOSE_MODAL":
        return {...state, isOpen: false, title: undefined, content: undefined };
      default:
        return state;
    }
  };