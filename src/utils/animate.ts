interface Easing {
  [key: string]: (t: number) => number;
}

const easing: Easing = {
  // no easing, no acceleration
  linear: function (t: number) {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: function (t: number) {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: function (t: number) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: function (t: number) {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: function (t: number) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: function (t: number) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: function (t: number) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  easeInQuint: function (t: number) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: function (t: number) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  },
};

const getValue = (
  start: number,
  end: number,
  elapsed: number,
  duration: number,
  easeMethod: string
) => {
  if (elapsed >= duration) return end;

  return start + (end - start) * easing[easeMethod](elapsed / duration);
};

type getValueFunction = (
  fromValue: number,
  toValue: number,
  elapsed: number,
  duration: number,
  easeMethod: string
) => void;

interface IAnimateParams {
  fromValue: number;
  toValue: number;
  onUpdate: (getValue: number, CallBack: void) => void;
  OnComplete: () => void;
  duration: number;
  easeMethod: string;
}

const animate = ({
  fromValue,
  toValue,
  onUpdate,
  OnComplete,
  duration = 600,
  easeMethod = "linear",
}: IAnimateParams) => {
  const startTime = performance.now();

  const tick = () => {
    const elapsed = performance.now() - startTime;

    window.requestAnimationFrame(() => {
      return onUpdate(
        getValue(fromValue, toValue, elapsed, duration, easeMethod),

        //CallBack
        elapsed <= duration ? tick() : OnComplete()
      );
    });
  };

  tick();
};

export default animate;
