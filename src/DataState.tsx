import React, { useState, useEffect } from 'react';

const DataStateEmpty = 'DataState::Empty' as const;
const DataStateLoading = 'DataState::Loading' as const;

export type DataState<T> =
  | typeof DataStateEmpty
  | typeof DataStateLoading
  | Error
  | T;

export const DataState = {
  Empty: DataStateEmpty,
  Loading: DataStateLoading,
  error: (message?: string): Error => {
    return Error(message ?? 'Something went wrong.');
  },
  isEmpty: <T extends unknown>(
    ds: DataState<T>
  ): ds is typeof DataStateEmpty => {
    return ds === DataStateEmpty;
  },
  isLoading: <T extends unknown>(
    ds: DataState<T>
  ): ds is typeof DataStateLoading => {
    return ds === DataStateLoading;
  },
  isError: <T extends unknown>(ds: DataState<T>): ds is Error => {
    return ds instanceof Error;
  },
  isReady: <T extends unknown>(ds: DataState<T>): ds is T => {
    return (
      !DataState.isError(ds) &&
      !DataState.isLoading(ds) &&
      ds !== DataStateEmpty
    );
  },
};

export const useDataState = <T extends unknown>(
  getData: () => Promise<T>,
  deps: readonly unknown[]
): [DataState<T>, React.Dispatch<React.SetStateAction<DataState<T>>>] => {
  const [dataState, setDataState] = useState<DataState<T>>(DataState.Loading);
  useEffect(() => {
    let stale = false;
    getData()
      .then(data => {
        if (!stale) setDataState(data);
      })
      .catch(error => {
        if (!stale) setDataState(Error(error.message));
      });
    return () => {
      stale = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return [dataState, setDataState];
};

export const DataStateView = <T extends unknown>(props: {
  data: DataState<T>;
  children: (data: T) => JSX.Element | null;
  loading: () => JSX.Element | null;
  error: () => JSX.Element | null;
}): JSX.Element | null => {
  if (DataStateEmpty === props.data) return null;
  if (DataState.isLoading(props.data)) return props.loading();
  if (DataState.isError(props.data)) return props.error();
  return props.children(props.data);
};
