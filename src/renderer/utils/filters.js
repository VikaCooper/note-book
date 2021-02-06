import Vue from 'vue';

import moment from 'moment';

/**
 * 时间 转年月日
 */
Vue.filter('timeTransfer', (time) => {
  if (time) {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
});
