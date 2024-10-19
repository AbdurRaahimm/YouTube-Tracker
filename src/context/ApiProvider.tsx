import { createContext, useReducer, ReactNode, useContext } from "react";

// Define the context type, specifying that data is an array
type ApiContextType = {
    data: any[]; // Assuming the data is an array of objects, you can also type it more strictly if needed
    isLoading: boolean;
    error: any; // Consider typing error as something more specific like `string | null`
    fetchData: (url: string) => Promise<void>;
    postData: (url: string, data: any) => Promise<void>;
};

// Create context with the defined type
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Define the initial state type
type ApiState = {
    data: any[];
    isLoading: boolean;
    error: any; // Similar, consider refining to `string | null` if error is string-based
};

// Define the initial state object
const initialState: ApiState = {
    data: [],
    isLoading: false,
    error: null,
};

// Define action types for reducer
type ApiAction =
    | { type: "FETCH_DATA_REQUEST" }
    | { type: "FETCH_DATA_SUCCESS"; payload: any[] }
    | { type: "FETCH_DATA_FAILURE"; payload: any };

// Define the reducer function with proper typing
const apiReducer = (state: ApiState, action: ApiAction): ApiState => {
    switch (action.type) {
        case "FETCH_DATA_REQUEST":
            return { ...state, isLoading: true };
        case "FETCH_DATA_SUCCESS":
            return { ...state, data: action.payload, isLoading: false };
        case "FETCH_DATA_FAILURE":
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};

// Define the provider's props type
type ApiProviderProps = {
    children: ReactNode;
};

// Export the ApiProvider component
export default function ApiProvider({ children }: ApiProviderProps) {
    const [state, dispatch] = useReducer(apiReducer, initialState);

    // Function to fetch data and dispatch actions
    const fetchData = async (url: string): Promise<void> => {
        dispatch({ type: "FETCH_DATA_REQUEST" });
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error });
        }
    };

    const postData = async (url: string, data: any): Promise<any> => {
        dispatch({ type: "FETCH_DATA_REQUEST" });
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "kind": "youtube",
                        "query": data.channelName,      
                        "locale": "en"
                    }
                ),
            });
            const result = await response.json();
            dispatch({ type: "FETCH_DATA_SUCCESS", payload: result });
        }
        catch (error) {
            dispatch({ type: "FETCH_DATA_FAILURE", payload: error });
        }
    }

    return (
        <ApiContext.Provider value={{ ...state, fetchData, postData }}>
            {children}
        </ApiContext.Provider>
    );
}


// custom hook
export const useApi = () => {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider in main.tsx')
    }
    return context
}


