import { useState } from "react";

interface PromisedReducer<S, A> {
    (prevState: S, action: A): Promise<S>;
}

export function useAsyncReducer<S, A>(reducer: PromisedReducer<S, A>, initialState: S = null): [S, (a: A) => Promise<void>] {
    const [state, setState] = useState(initialState);

    const dispatch = async (action: any) => {
        try {
            const newState = await reducer(state, action);
            setState(newState);
        } catch (err) {
            setState({ ...state, error: err });
        }
    };

    return [state, dispatch];
}

