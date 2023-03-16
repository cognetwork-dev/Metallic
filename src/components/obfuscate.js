/**
 * I hereby surrender the license to `src/obfuscate.js`.
 */
import clsx from "clsx";
import { create } from "random-seed";
import { memo } from "react";
import { obfuscation } from "../consts.js";

const rand = create(navigator.userAgent + global.location.origin);

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let usedChars = "";

function unusedChar() {
  while (true) {
    const char = chars[rand(chars.length)];

    if (usedChars.includes(char)) {
      continue;
    }

    usedChars += char;

    return char;
  }
}

function classes() {
  const classes = [];

  for (let i = 0; i < 7; i++) {
    classes.push(unusedChar());
  }

  return classes;
}

const junkClasses = classes();
const realClasses = classes();
const ellipsisClasses = classes();

const charClass = unusedChar();
const stringClass = unusedChar();

export function ObfuscateLayout() {
  const style =
    `${junkClasses
      .map((junk) => `.${stringClass} .${junk}`)
      .join(",")}{position:absolute;z-index:-10;opacity:0}` +
    `.${stringClass}>span{display:inline-block}` +
    `${ellipsisClasses
      .map((ellipsis) => `.${stringClass} .${ellipsis}`)
      .join(",")}{display:inline}`;

  return <style>{style}</style>;
}

class ObfuscateContext {
  constructor(seed) {
    this.rand = create(seed + navigator.userAgent + global.location.origin);
  }
  ellipsisClass() {
    return ellipsisClasses[this.rand(ellipsisClasses.length)];
  }
  junkClass() {
    return junkClasses[this.rand(junkClasses.length)];
  }
  realClass() {
    return realClasses[this.rand(realClasses.length)];
  }
  random(chars, i, ci) {
    const r = this.rand(2);

    switch (r) {
      default:
        console.warn("Random for", r, "not set...");
      // eslint-disable-next-line
      case 0:
        return (
          <span key={i} className={this.junkClass()}>
            {chars[chars.length - ci]}
          </span>
        );
      case 1:
        return (
          <span key={i} className={this.junkClass()}>
            {String.fromCharCode(
              chars[chars.length - ci - 1].charCodeAt(0) ^ i
            )}
          </span>
        );
    }
  }
}

export const ObfuscatePrimitive = memo(function Obfuscate({ text, ellipsis }) {
  const context = new ObfuscateContext(text);

  const output = [];
  const words = text.split(" ");

  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi];
    const chars = word.split("");

    const added = [];

    for (let ci = 0; ci < chars.length; ci++) {
      const char = chars[ci];

      const content = [];

      const addChars = context.rand.intBetween(1, 2);
      const realAtI = context.rand(addChars);

      for (let i = 0; i < addChars; i++) {
        if (i === realAtI) {
          content.push(
            <span key={`${wi}${ci}${i}`} className={context.realClass()}>
              {char}
            </span>
          );
        } else {
          content.push(context.random(chars, i, ci));
        }
      }

      added.push(
        <span key={`${wi}${ci}`} className={charClass}>
          {content}
        </span>
      );
    }

    output.push(
      <span className={clsx(ellipsis && context.ellipsisClass())} key={`${wi}`}>
        {added}
      </span>
    );

    if (wi !== words.length - 1) {
      output.push(" ");
    }
  }

  return <span className={stringClass}>{output}</span>;
});

/**
 * @description An obfuscated text block. This will strip the input of all non-text elements.
 */
const Obfuscate = memo(function Obfuscate({ ellipsis, children }) {
  if (!obfuscation) {
    return children;
  }

  let string = "";

  const stack = [
    {
      props: {
        children: children,
      },
    },
  ];

  let toclone;
  while ((toclone = stack.pop())) {
    if (typeof toclone === "string") {
      string += toclone;
    } else if (typeof toclone === "object" && toclone !== undefined) {
      let children = toclone.props.children;

      if (!Array.isArray(children)) children = [children];

      const max = children.length;
      for (let i = 0; i < max; i++) {
        // append in reverse order
        const child = children[max - i - 1];
        stack.push(child);
      }
    }
  }

  return <ObfuscatePrimitive text={string} ellipsis={ellipsis} />;
});

export default Obfuscate;
