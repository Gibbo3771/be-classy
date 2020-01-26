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
export type MapClassesWithProps<P extends Object = {}, R = any> = (
  /**
   *
   */
  props: P
) => R;

/**
 * Takes an instance of @ClassyClasses and returns a decorated function
 * that can be called with props
 * @param func decorated function that will be returned
 */
export function beClassy<P = {}, R extends ClassyClasses = {}, C = {}>(
  func: MapClassesWithProps<P, R>
): (props?: P) => C {
  return function(props?: P): C {
    return mapClasses<C, R>(props ? func(props) : func({} as P));
  };
}

/**
 * @param classes
 */
function mapClasses<C, R extends ClassyClasses>(classes: R): C {
  const mapped: any = {};
  for (let [key, value] of Object.entries(classes)) {
    mapped[key] = Object.keys(value)
      .filter((key: string) => {
        return value[key];
      })
      .join(" ");
  }
  return mapped as C;
}
