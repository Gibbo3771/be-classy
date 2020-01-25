import { beClassy, ClassyRoot, ClassyClasses } from "../lib/index";
import { expect } from "chai";
import "mocha";

/**
 * Test types
 */
interface Props {
  buttonHovered: boolean;
  isMobile: boolean;
}
interface Roots extends ClassyClasses {
  root: ClassyRoot;
  button: ClassyRoot;
}

describe("be-classy", function() {
  it("beClassy returns a function", function() {
    const useClasses = beClassy(() => {
      return {};
    });
    expect(useClasses).to.be.instanceOf(Function);
  });
  it("maps classes to the original root object key", function() {
    const useClasses = beClassy(() => {
      return {
        myClasses: {},
        otherClasses: {}
      };
    });
    expect(useClasses({})).ownProperty("myClasses").to.exist;
    expect(useClasses({})).ownProperty("otherClasses").to.exist;
  });
  it("Joins classes with true", function() {
    type Classes = {
      root: string;
    };
    const useClasses = beClassy(() => {
      return {
        root: {
          "my-class": true,
          "my-other-class": true
        }
      };
    });
    expect(useClasses<Classes>({}).root).to.eq("my-class my-other-class");
  });
  it("Ignores classes with false expressions", function() {
    type Classes = {
      root: string;
    };
    const useClasses = beClassy(() => {
      return {
        root: {
          "my-class": false,
          "my-other-class": false
        }
      };
    });
    expect(useClasses<Classes>({}).root).to.eq("");
  });

  describe("Integration test", function() {
    const useClasses = beClassy<Props, Roots>(props => {
      return {
        root: {
          flex: true,
          "flex-col": true,
          "background--green": !props.isMobile,
          "background--red": props.isMobile
        },
        button: {
          "background--dark": !props.buttonHovered,
          "background--light": props.buttonHovered,
          "class-never": false
        }
      };
    });
    it("Match test 1", function() {
      expect(
        useClasses<{ root: string; button: string }>({
          buttonHovered: false,
          isMobile: false
        }).root
      ).to.eq("flex flex-col background--green");
    });
    it("Match test 2", function() {
      expect(
        useClasses<{ root: string; button: string }>({
          buttonHovered: false,
          isMobile: true
        }).root
      ).to.eq("flex flex-col background--red");
    });
    it("Match test 3", function() {
      expect(
        useClasses<{ root: string; button: string }>({
          buttonHovered: true,
          isMobile: true
        }).button
      ).to.eq("background--light");
    });
  });
});
