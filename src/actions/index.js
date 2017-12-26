const LOAD_DATA = 'LOAD_USER';
/*
 * action creators
 */

export function getData(responseData) {
  return { type: LOAD_DATA, data: responseData }
}