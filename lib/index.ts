export interface ClassyRoot {
  [key: string]: boolean;
}

/**
 * Classes are mapped using a root key, followed by a @ClassyRoot
 * that contains the class string and a boolean expression to
 * decide if the given class should me included in the final mapping
 */
export interface ClassyClasses {
  [key: string]: ClassyRoot;
}

/**
 *
 */
export type MapClassesWithProps<T extends Object = {}, R = any> = (
  /**
   *
   */
  props: T
) => R;

/**
 * Takes an instance of @ClassyClasses and returns a decorated function
 * that can be called with props
 * @param func decorated function that will be returned
 */
export function beClassy<T = {}, R extends ClassyClasses = {}>(
  func: MapClassesWithProps<T, R>
): <K>(props: T) => K {
  return function<K>(props: T): K {
    return mapClasses<K, R>(func(props));
  };
}

/**
 * @param classes
 */
function mapClasses<K, R extends ClassyClasses>(classes: R): K {
  const mapped: any = {};
  for (let [key, value] of Object.entries(classes)) {
    mapped[key] = Object.keys(value)
      .filter((key: string) => {
        return value[key];
      })
      .join(" ");
  }
  return mapped as K;
}
