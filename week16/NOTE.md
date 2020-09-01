# 每周总结可以写在这里

## 组件化-自定义手势

```js
let start = (point, context) => {
  element.dispatchEvent(
    new CustomEvent("start", {
      startX: point.clinetX,
      startY: point.clinetY,
      clinetX: point.clinetX,
      clinetY: point.clinetY,
    })
  );
  context.startX = point.clinetX;
  context.startY = point.clinetY;
  context.moves = [];
  context.isTap = true;
  context.isPan = false;
  context.isPress = false;
  context.timoutHandler = setTimeout(() => {
    if (context.isPan) {
      return;
    }

    context.isTap = false;
    context.isPan = false;
    context.isPress = true;

    element.dispatchEvent(new CustomEvent("pressstart", {}));
  }, 500);
  console.log("start", context, point, point.clinetX);
};

let move = (point, context) => {
  const dx = point.clinetX - context.startX;
  const dy = point.clinetY - context.startY;

  if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
    if (context.isPress) {
      element.dispatchEvent(new CustomEvent("presscancel", {}));
    }

    context.isTap = false;
    context.isPan = true;
    context.isPress = true;

    element.dispatchEvent(
      new CustomEvent("panstart", {
        startX: context.startX,
        startY: context.startY,
        clinetX: point.clinetX,
        clinetY: point.clinetY,
      })
    );
  }

  if (context.isPan) {
    context.moves.push({
      dx,
      dy,
      t: Date.now(),
    });

    context.moves = context.moves.filter(
      (record) => Date.now() - record.t < 300
    );
    let e = new CustomEvent("pan");
    Object.assign(e, {
      startX: context.startX,
      startY: context.startY,
      clinetX: point.clinetX,
      clinetY: point.clinetY,
    });
    event.dispatchEvent(e);
  }
  console.log("move", dx, dy, context);
};

let end = (point, context) => {
  if (context.isPan) {
    let dx = point.clinetX - context.startX;
    let dy = point.clinetY - context.startY;
    let record = context.moves[0];
    let speed =
      Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
      (Date.now() - record.t);

    let isFlick = speed > 2.5;

    if (isFlick) {
      element.dispatchEvent(
        new CustomEvent("flick", {
          startX: context.startX,
          startY: context.startY,
          clinetX: point.clinetX,
          clinetY: point.clinetY,
          speed,
        })
      );
    }

    element.dispatchEvent(
      Object.assign(new CustomEvent("panend"), {
        startX: context.startX,
        startY: context.startY,
        clinetX: point.clinetX,
        clinetY: point.clinetY,
        speed,
        isFlick,
      })
    );
  }

  if (context.isTap) {
    element.dispatchEvent(new CustomEvent("tap", {}));
  }

  if (context.isPress) {
    element.dispatchEvent(new CustomEvent("pressend"), {});
  }

  clearTimeout(context.timoutHandler);
};

let cancel = (point, context) => {
  element.dispatchEvent(new CustomEvent("canceled"), {});
  clearTimeout(context.timoutHandler);
};
```

## 组件化-轮播图添加手势支持，生命周期

```js
const children = this.data.map((url, currentPosition) => {
  const nextPosition = (currentPosition + 1) % this.data.length;
  const lastPosition =
    (currentPosition - 1 + this.data.length) % this.data.length;

  let offset = 0;

  let onStart = () => {
    timeline.pause();
    clearTimeout(nextPicStopHandler);

    const currentElement = children[currentPosition];

    const currentTransformValue = Number(
      currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
    );
    offset = currentTransformValue + 500 * currentPosition;
  };

  let onPan = (event) => {
    const currentTransformValue = 500 * currentPosition + offset + dx;
    const nextTransformValue = 500 - 500 * nextPosition + offset + dx;
    const lastTransformValue = -500 - 500 * lastPosition + offset + dx;
    const dx = event.clientX - event.startX;

    const currentElement = children[currentPosition];
    const nextElement = children[nextPosition];
    const lastElement = children[lastPosition];

    currentElement.style.transform = `translateX(${currentTransformValue}px)`;
    nextElement.style.transform = `translateX(${nextTransformValue}px)`;
    lastElement.style.transform = `translateX(${lastTransformValue}px)`;
  };

  let onPanend = (event) => {
    let direction = 0;
    const dx = event.clientX - event.startX;
    if (dx + offset > 250) {
      direction = 1; // 往右拖动
    } else if (dx + offset < -250) {
      direction = -1; // 往左拖动
    }
    timeline.reset();
    timeline.start();

    const currentElement = children[currentPosition];
    const nextElement = children[nextPosition];
    const lastElement = children[lastPosition];

    const currentTransformValue = 500 * currentPosition + offset + dx;
    const nextTransformValue = 500 - 500 * nextPosition + offset + dx;
    const lastTransformValue = -500 - 500 * lastPosition + offset + dx;
    const currentAnimation = new Animation(
      currentElement.style,
      "transform",
      (v) => `translateX(${v}px)`,
      currentTransformValue,
      -500 * currentPosition + direction * 500,
      500,
      0,
      ease
    );
    const nextAnimation = new Animation(
      nextElement.style,
      "transform",
      (v) => `translateX(${v}px)`,
      nextTransformValue,
      500 - 500 * nextPosition + direction * 500,
      500,
      0,
      ease
    );
    const lastAnimation = new Animation(
      lastElement.style,
      "transform",
      (v) => `translateX(${v}px)`,
      lastTransformValue,
      -500 - 500 * lastPosition + direction * 500,
      500,
      0,
      ease
    );

    timeline.add(currentAnimation);
    timeline.add(nextAnimation);
    timeline.add(lastAnimation);

    position = (position - direction + this.data.length) % this.data.length;
    nextPicStopHandler = setTimeout(nextPic, 3000);
  };

  const element = (
    <img
      src={url}
      draggable="false"
      onStart={onStart}
      onPan={onPan}
      onPanend={onPanend}
      enableGesture={true}
    />
  );
  element.style.transform = "translateX(0px)";
  element.addEventListener("dragstart", (e) => e.preventDefault());
  return element;
});
```
