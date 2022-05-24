/*
 * @Description:
 * @Author: liudehua
 * @Date: 2021-01-04 13:59:16
 * @LastEditTime: 2021-01-04 14:34:01
 * @LastEditors: liudehua
 */
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (num: any) => {
  num = num.toFixed(2);
  num = parseFloat(num);
  num = num.toLocaleString();
  return num;
};
