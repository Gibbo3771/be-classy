export interface ClassyClasses {
  [key: string]: boolean;
}

/**
 * Classes are mapped using a root key, followed by a @ClassyClasses
 * that contains the class string and a boolean expression to
 * decide if the given class should me included in the final mapping
 */
export interface ClassyIdentityKeys {
  [key: string]: ClassyClasses;
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

type ClassyClassMap<T> = {
  [P in keyof T]: string;
};

/**
 * Takes an instance of @ClassyIdentityKeys and returns a decorated function
 * that can be called with props
 * @param func decorated function that will be returned
 *
 */
export function beClassy<Props extends Object = {}, Keys = ClassyIdentityKeys>(
  func: MapClassesWithProps<Props, Keys>
): (props?: Props) => ClassyClassMap<Keys> {
  return function(props?: Props): ClassyClassMap<Keys> {
    const classes = props ? func(props) : func({} as Props);
    // TODO mapped needs typed
    const mapped: any = {};
    for (let [key, value] of Object.entries(classes)) {
      mapped[key] = Object.keys(value)
        .filter((key: string) => value[key])
        .join(" ");
    }
    return mapped;
  };
}
