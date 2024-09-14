import { type Reducer, useCallback, useReducer, useRef } from "react";

interface IdleAction {
  type: "idle";
}

interface LoadingAction {
  type: "loading";
}

interface SuccessAction<TData> {
  type: "success";
  data: TData;
}

interface ErrorAction<TError> {
  type: "error";
  error: TError;
}

type Action<TData, TError> =
  | SuccessAction<TData>
  | ErrorAction<TError>
  | LoadingAction
  | IdleAction;

type MutationStateIdle = {
  data: undefined;
  error: undefined;
  isLoading: false;
  isError: false;
};

type MutationStateLoading = {
  data: undefined;
  error: undefined;
  isLoading: true;
  isError: false;
};

type MutationStateError<TError> = {
  data: undefined;
  error: TError;
  isLoading: false;
  isError: true;
};

type MutationStateSuccess<TData> = {
  data: TData;
  error: undefined;
  isLoading: false;
  isError: false;
};

type MutationState<TData, TError> =
  | MutationStateLoading
  | MutationStateIdle
  | MutationStateError<TError>
  | MutationStateSuccess<TData>;

const reducer = <TData, TError>(
  state: MutationState<TData, TError>,
  action: Action<TData, TError>,
): MutationState<TData, TError> => {
  const { type } = action;
  switch (type) {
    case "idle":
      return {
        ...state,
        data: undefined,
        error: undefined,
        isLoading: false,
        isError: false,
      };
    case "success":
      return {
        ...state,
        data: action.data,
        error: undefined,
        isLoading: false,
        isError: false,
      };
    case "error":
      return {
        ...state,
        data: undefined,
        error: action.error,
        isLoading: false,
        isError: true,
      };
    case "loading":
      return {
        ...state,
        data: undefined,
        error: undefined,
        isLoading: true,
        isError: false,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

interface MutationCallbacks<TData, TError> {
  onSuccess?: (response: TData) => void;
  onError?: (error: TError) => void;
}

type UseMutationOptions<TData, TError, TVariables> = {
  mutationFn: (arg: TVariables) => Promise<TData>;
} & MutationCallbacks<TData, TError>;

type UseMutationReturn<TData, TError, TVariables> = MutationState<
  TData,
  TError
> & {
  mutate: (
    variables: TVariables,
    options?: MutationCallbacks<TData, TError>,
  ) => void;
  reset: () => void;
};

export const useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables>,
): UseMutationReturn<TData, TError, TVariables> => {
  const requestRef = useRef(options.mutationFn);

  const [state, dispatch] = useReducer<
    Reducer<MutationState<TData, TError>, Action<TData, TError>>
  >(reducer, {
    data: undefined,
    error: undefined,
    isLoading: false,
    isError: false,
  });

  const mutate = useCallback<
    UseMutationReturn<TData, TError, TVariables>["mutate"]
  >((variables, options) => {
    dispatch({ type: "loading" });
    requestRef
      .current(variables)
      .then((response) => {
        dispatch({ type: "success", data: response });
        options?.onSuccess?.(response);
      })
      .catch((error) => {
        const err = error as TError;
        dispatch({ type: "error", error: err });
        options?.onError?.(err);
      });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "idle" });
  }, []);

  return { ...state, mutate, reset };
};
