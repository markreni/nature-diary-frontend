import { createContext, useReducer, useContext, type Dispatch, type ReactNode} from 'react'

export type QuestionState = {
  'domestic': boolean,
  'public': boolean,
  'identification': boolean
};

export interface QuestionAction {
  payload: QuestionState
}

export interface QuestionContextValue {
  state: QuestionState;
  dispatch: Dispatch<QuestionAction>;
}

const initialState: QuestionState = {
  'domestic': true,
  'public': true,
  'identification': true
};

const FormContext = createContext<QuestionContextValue | undefined>(undefined)

// Props interface
interface FormProviderProps {
  children: ReactNode;
}

const questionReducer = (state: QuestionState, action: QuestionAction ): QuestionState => {
  return {...state, ...action.payload}
}

export const FormContextProvider: React.FC<FormProviderProps> = (props) => {
  const [state, dispatch] = useReducer(questionReducer, initialState)
  
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FormContext.Provider>
  )
}

export const useQuestionValues = () => {
  const counterAndDispatch: QuestionContextValue = useContext(FormContext)!
  return counterAndDispatch.state
}

export const useQuestionDispatch = () => {
  const counterAndDispatch: QuestionContextValue  = useContext(FormContext)!
  return counterAndDispatch.dispatch
}

export default FormContext