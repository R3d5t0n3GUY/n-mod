setTimeout(() => {
  fileLoads.isPrototypesJS = true; //for file handling in fileTester.js
}, 10);

String.prototype.sanitize = function () {
  let input = this.valueOf(), regExp = /\n\s+/g
  str = input.replace(/[^\S\n]+/g, " ") //replace all non-newline whitespace characters with space characters
  str = str.replace(/\n\s+/g, "\n") //replace all instances of newlines followed by whitespace with single newlines
  let padding = (str.includes("  ") || regExp.test(str)) //check for resulting double-spaces
  while (padding) { //repeatedly replace double-spaces with single spaces until none remain
    str = str.replaceAll("  ", " ")
    str = str.replace(/\n\s+/g, "\n")
    padding = (str.includes("  ") || regExp.test(str))
  }
  return str.trim() //remove preceding and trailing whitespace
}

String.prototype.escapeHTML = function () {
  let str = this.valueOf();
  return str.replace(/[&<>"']/g, function (tag) {
    let replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return replacements[tag] || tag;
  });
}

Number.prototype.clampToRange = function (min, max) {
  return Math.min(Math.max(this.valueOf(), min), max)
}

Number.prototype.mapToScale = function (min1, max1, min2, max2) {
  let n = this.valueOf(), numer = max2 - min2, denomin = max1 - min1;
  return (numer / denomin) * (n - min1) + min2
}

Object.prototype.appendObject = function (sourceObj) {
  let targetObj = this.valueOf();
  Object.assign(targetObj, sourceObj);
  return targetObj;
}

Object.prototype.appendObjects = function (array = []) { //array items should be objects
  array.forEach((item,idx) => {
    if (Array.isArray(item) || item == null || typeof (item) !== "object") {
      throw new TypeError(`${(Array.isArray(item) ? "Array" : item == null ? "null" : typeof(item))}.assign() is not a function
      \nat "..pendObjects([...>>> ${item} <<<...])" (indexed at position ${idx})`);
    } else {
      Object.assign(this, item);
    }
  });
}

Array.prototype.randomItem = function(weights = null) { //picks a random weighted item
  let choices = this.valueOf(), idx = 0, totalWeight = 0, cumulSum = 0
  if (weights === null || weights === undefined || weights.length === 0) {
    idx = Math.floor(Math.random() * choices.length)
    return choices[idx] 
  } else if (choices.length === weights.length && Array.isArray(weights)) {
    weights.forEach(item => {
      if (typeof(item) === "number" && item > 0) {
        totalWeight += item
      } else {
        throw new TypeError("Array.randomItem() is not a function")
      }
    });
    idx = Math.random() * totalWeight
    for (let i = 0, len = weights.length; i < len; i++){
      cumulSum += weights[i]
      if (cumulSum > idx) return choices[i]
    }
  } else {
    throw new TypeError("Array.randomItem() is not a function")
  }
}

String.prototype.shuffle = function () { //scrambles text
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

String.prototype.parseAsJSON = function () { //parses an object string as JSON
  let regExps = [/,\s*/g, /:\s*/g, /\s*\[\s*,/g, /\s*\{\s*,/g, /,*\s*\]\s*/g, /,*\s*\}\s*/g, /:\s*,/g, /,\s*:/g],
      replacements = [",", ":", "[", "{", "]", "}"], result = this.valueOf().sanitize(), testStr = function (str, exps) {
        let isMatch = false;
        for (let i = 0, len = exps.length; i < len; i++) {
          let expr = exps[i];
          if (expr.test(str)) {
            isMatch = true;
            break;
          }
        }
        return isMatch;
      };
  let isDone = !testStr(result, regExps)
  while (!isDone) {
    regExps.forEach((regExp, i) => {
      result = result.replace(regExp, replacements[i] || "")
    });
    isDone = testStr(result, regExps)
  }
  return JSON.parse(result);
}

class ArgumentError extends Error { //initialize ArgumentError
  constructor(message) {
    super(message); // Call the base Error constructor
    this.name = 'ArgumentError';
  }
}

class HtmlError extends Error { //initialize HtmlError
  constructor(message) {
    super(message); // Call the base Error constructor
    this.name = 'HtmlError';
  }
}

Math.PHI = Math.sqrt(1.25) + 0.5 //defines the golden ratio

const hsvo = (hue = 0, saturation = 0, value = 0, opacity = 0) => { //generates an RGB string from hue, saturation, and value. Preserves opacity
  if (isFinite(hue)) {
    hue = ((hue % 360) + 360) % 360
  } else {
    hue = 0
  }
  let clamp = (num) => {
    return (isFinite(num) ? Math.min(Math.max(num, 0), 1) : 0)
  }
  saturation = clamp(saturation)
  value = clamp(value)
  opacity = clamp(opacity)
  let c = saturation * value, sect = (hue / 60) % 2,
  x = c * (1 - Math.abs(sect - 1)), m = Math.max(value - c, 0),
  [r, g, b] = ((C, X) => {
    switch (Math.floor(hue / 60)) {
      case 0: return [C, X, 0];
      case 1: return [X, C, 0];
      case 2: return [0, C, X];
      case 3: return [0, X, C];
      case 4: return [X, 0, C];
      case 5: return [C, 0, X];
      default: return [0, 0, 0]; //this case in reality should not be reached
    }
  })(c, x), [R, G, B] = [Math.floor((r + m) * 255), Math.floor((g + m) * 255), Math.floor((b + m) * 255)]
  return `rgba(${R}, ${G}, ${B}, ${opacity})`
}
Object.freeze(hsvo)

const kochFract = (iters, rad) => { //returns a list of vertices to generate a Koch Snowflake
  let genSegmt = (a, b) => {
    let dx = b.x - a.x, dy = b.y - a.y, p2 = {
      x: a.x + dx / 3,
      y: a.y + dy / 3
    }, p4 = {
      x: a.x + 2 * dx / 3,
      y: a.y + 2 * dy / 3
    }, angle = Math.PI / 3, px = p4.x - p2.x, py = p4.y - p2.y, p3 = {
        x: p2.x + (px * Math.cos(angle) - py * Math.sin(angle)),
        y: p2.y + (px * Math.sin(angle) + py * Math.cos(angle))
    };
    return [a, p2, p3, p4]
  }, nextIter = (pts) => {
    const result = [];
    for (let i = 0; i < pts.length; i++) {
      let a = pts[i], b = pts[(i + 1) % pts.length], seg = genSegmt(a, b);
      result.push(...seg);
    }
    return result;
  }, points = [
      { x: 0, y: rad * Math.sqrt(3) / -4 },
      { x: rad / -2, y: rad * Math.sqrt(3) / 4 },
      { x: rad / 2, y: rad * Math.sqrt(3) / 4 }
    ];

  for (let i = 0; i < iters; i++) {
      points = nextIter(points);
  }
  return points;
}
Object.freeze(kochFract)

const requestAnimFrames = (n, fn) => { //replaces requestAnimationFrame nesting
  n = Math.floor(Math.abs(n) + 0.5) //round absolute value to nearest integer
  let iterate = (N, FN) => {
    if (N > 0) {
      requestAnimationFrame(() => { //request next iteration
        iterate(N - 1, FN)
      })
    } else {
      FN(); //run requested frame
    }
  }
  iterate(n, fn)
}
Object.freeze(requestAnimFrames)