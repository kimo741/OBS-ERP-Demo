import {ref} from "vue"
import {LocalStorage} from "quasar"
export let DEFAULT_LANG =ref("en-us"); // ar or en-US
export const DEFAULT_COMPANY_LANG = 4;
export const COUNTRY_CODE = LocalStorage.getItem("contry-code");
// export const changeDEFAULT_LANG = (lang) =>{
//   return DEFAULT_LANG = lang
// }
