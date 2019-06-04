const getTag = val => Object.prototype.toString.call(val);
const isType = type => val =>
    val != null && getTag(val)  === `[object ${type}]`;

export const isObj = val => val != null && typeof val === 'object';
export const isPlainObj = isType('Object');
export const isStr = val => typeof val === 'string' || isType('String')(val);
export const isBool = val => typeof val === 'boolean' || isType('Boolean')(val);
export const isNum = val => typeof val === 'number' || isType('Number')(val);
export const isArr = Array.isArray || isType('Array');
export const isRegExp = isType('RegExp');
export const isFunc = val => {
    if (typeof val === 'function') {
        return true;
    }
    const tag = getTag(val);
    return tag == '[object Function]' || tag == '[object AsyncFunction]' ||
    tag == '[object GeneratorFunction]' || tag == '[object Proxy]';
};