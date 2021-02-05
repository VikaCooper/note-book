/* eslint-disable */

export const getID = (length = 16) => Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
