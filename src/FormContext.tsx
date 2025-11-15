import { createContext, useReducer, useContext, useEffect, type Dispatch, type ReactNode} from 'react'

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
  domestic: true,
  public: true,
  identification: true,
};

const STORAGE_KEY = 'questionState_v1';

const FormContext = createContext<QuestionContextValue | undefined>(undefined)

// Props interface
interface FormProviderProps {
  children: ReactNode;
}

const questionReducer = (state: QuestionState, action: QuestionAction ): QuestionState => {
  return {...state, ...action.payload}
}

// lazy initializer reads from localStorage if present
const initState = (init: QuestionState) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuestionState) : init;
  } catch {
    return init;
  }
}

export const FormContextProvider: React.FC<FormProviderProps> = (props) => {
  const [state, dispatch] = useReducer(questionReducer, initState(initialState))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write errors
    }
  }, [state]);
  
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FormContext.Provider>
  )
}

export const useQuestionValues = () => {
  const ctx = useContext(FormContext)!;
  return ctx.state
  //const counterAndDispatch: QuestionContextValue = useContext(FormContext)!
  //return counterAndDispatch.state
}

export const useQuestionDispatch = () => {
  const ctx = useContext(FormContext)!;
  return ctx.dispatch
  //const counterAndDispatch: QuestionContextValue  = useContext(FormContext)!
  //return counterAndDispatch.dispatch
}

export default FormContext