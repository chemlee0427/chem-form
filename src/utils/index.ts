export const isFunction = (target: any) => Object.prototype.toString.call(target) === '[object Function]';
export const isArray = (target: any) => Object.prototype.toString.call(target) === '[object Array]';
export const isNull = (target: any) => Object.prototype.toString.call(target) === '[object Null]';

export const deepCopy = (target: Array<any> | Record<string, any>) => {
  if (typeof target !== 'object' || isNull(target)) {
    console.error('深拷贝暂支持Array和Object');
    return;
  }
  const _newObj = target instanceof Array ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      _newObj[key] = typeof target[key] === 'object' ? deepCopy(target[key]) : target[key];
    }
  }
  return _newObj;
};
