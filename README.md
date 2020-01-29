# Be Classy

A super lightweight (_312 bytes minified!_) Javascript utlity library for conditionally mapping CSS class names.
It was created to assist in use of the excellent TailwindCSS CSS package but can easily be used without!

## Enough talk, show me the code

```Javascript
import { beClassy } from "be-classy";

const useClasses = beClassy(({ hovered }) => {
    return {
        button: {
            "button": true,
            "background--white": !hovered,
            "background--blue": hovered
        }
    }
});


const classes = useClasses({ hovered: true });
console.log(classes.button) // => "button background--white"
const classes = useClasses({ hovered: false });
console.log(classes.button) // => "button background--blue"

```

# Installation

`npm install be-classy`

or

`yarn add be-classy`

## Typescript support

Be Classy comes with Typescript support out of the box and hopefully the typings are tight enough.

Here is a Typescript example:

```Javascript

import { beClassy, ClassyIdentityKeys, ClassyClasses } from "be-classy";


/**
 *  Properties you want to pass to beClassy decorated function
 **/
type Props = {
    hovered: boolean;
}

/**
 * These are the root elements, I like to treat these like a modular style component that could
 * be applied to one, or many elements
 **/
interface Roots extends ClassyIdentityKeys {
  root: ClassyClasses;
  button: ClassyClasses;
}

/**
 * Props and the root structure are strictly typed, so we know what is being
 * passed in and what the function returned object should look like
 **/
const useClasses = beClassy<Props, Roots>(({ hovered }) => {
    return {
        button: {
            "button": true,
            "background--white": !hovered,
            "background--blue": hovered
        }
    }
});

const classes = useClasses({ hovered: true });
console.log(classes.button) // => "button background--white"
const classes = useClasses({ hovered: false });
console.log(classes.button) // => "button background--blue"

```
