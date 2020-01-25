# Be Classy

A super lightweight (_281 bytes minified!_) Javascript utlity library for conditionally mapping CSS class names.
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

## Typescript support

Be Classy comes with Typescript support out of the box and hopefully the typings are tight enough.

Here is a Typescript version:

```Javascript

import { beClassy, ClassyClasses, ClassyRoot } from "be-classy";


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
interface Roots extends ClassyClasses {
  root: ClassyRoot;
  button: ClassyRoot;
}

/**
 * These are the class defintions we get back from the
 * decorated function returned by beClassy
 * */
type Classes = {
    button: string
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

// We pass our classes typed here, so we don't get errors when we call a property
const classes = useClasses<Classes>({ hovered: true });
console.log(classes.button) // => "button background--white"
const classes = useClasses<Classes>({ hovered: false });
console.log(classes.button) // => "button background--blue"

```
