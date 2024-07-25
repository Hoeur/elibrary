import { formatDateToKhmer } from '../../../utils/index';
export const getDateFormat = (e: any) => {
  console.log(e);
  let date = new Date();
  let newDate: any;
  if (e.attributes.length > 0 && e.attributes[0] != null) {
    e.attributes.forEach((itm: any) => {
      if (
        itm?.name == 'កាលបរិច្ឆេទចេញផ្សាយ' &&
        itm?.name &&
        itm?.name != null
      ) {
        let DateFormat = new Date(itm.value);
        newDate = formatDateToKhmer(DateFormat||123456789, true);
        return newDate;
      }
    });
  }

  return newDate;
};
