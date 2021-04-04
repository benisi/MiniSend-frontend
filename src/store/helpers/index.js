export function textTruncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

export const objToQueryString = (obj) => {
  let str = "";
  let arr = objToQueryStringArray(obj);
  arr.forEach((entry) => {
    str += `${entry}&`;
  });
  str = `?${str}`;
  return str.substring(0, str.length - 1);
};

const objToQueryStringArray = (obj, depth = 1) => {
  let returnStringArray = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (typeof value == "string" || typeof value == "number") {
      let tempStr = "";
      if (depth > 1) {
        tempStr = `[${key}]=${encodeURIComponent(value)}`;
      } else {
        tempStr = `${key}=${encodeURIComponent(value)}`;
      }
      returnStringArray.push(tempStr);
    } else if (typeof value == "object" && !Array.isArray(value)) {
      let result = objToQueryStringArray(value, depth + 1);
      result.forEach((entry) => {
        if (depth > 1) {
          returnStringArray.push(`[${key}]${entry}`);
        } else {
          returnStringArray.push(`${key}${entry}`);
        }
      });
    } else if (Array.isArray(value)) {
      let valueString = "";
      value.forEach((entry) => {
        if (typeof entry == "string" || typeof entry == "number") {
          valueString += `${entry},`;
        }
      });
      if (valueString) {
        valueString = valueString.substring(0, valueString.length - 1);
      }
      if (depth > 1) {
        returnStringArray.push(`[${key}]=${encodeURIComponent(valueString)}`);
      } else {
        returnStringArray.push(`${key}=${encodeURIComponent(valueString)}`);
      }
    }
  });
  return returnStringArray;
};
