export enum LoadingStates {
  NotLoading,
  Loading,
  LoadFailed,
}

type Loader<T> = LoadingStates.NotLoading | LoadingStates.Loading | LoadingStates.LoadFailed | T;

export default Loader;
