import { ref } from "vue";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language";
import { LocalStorage } from "quasar";
export const unitForm = ref({
  id: 0,
  description: "",
  actionsTypes: "1",
  publishOnWebSite: true,
  isActive: true,
  unitsTypeId: null,
  usageFormsId: null,
  unitModelId: null,
  unitCategoryId: null,
  blockId: null,
  floorId: null,
  status: 2,
  incomeAccount: null,
  financialDimensionsId: null,
  image: "",
  policyId: null,
  owners: [
    // {
    //   vendorId: null,
    //   ownerShipRate: null
    // }
  ],
  contact: {
    name: "",
    jopPostition: "",
    idType: null,
    idNo: null,
    department: "",
    companyName: "",
    addressLine: "",
    cityName: "",
    poCode: "",
    regionId: 0,
    countryId: 0,
    email: "",
    phoneObj: { phoneNumber: "", countryCode: COUNTRY_CODE },
  },
  attachments: [
    // {
    //   id: 0,
    //   fileBase64: "",
    //   docNum: "",
    //   docName: "",
    //   date: "",
    //   url: ""
    // }
  ],
  unitPhotos: [
    // {
    //   id: 0,
    //   fileBase64: "",
    //   docNum: "",
    //   docName: "",
    //   date: "",
    //   url: ""
    // }
  ],
  translation: [
    {
      languageId: LocalStorage.getItem("defLanguage"),
      name: "",
    },
  ],
  leaseCostInfo: {
    areaM2: "",
    pu: "",
    netAreaM2: "",
    gardenAreaM2: "",
    balconiesAreaM2: "",
    rentalPriceParM2: null,
    paymentMethod: "",
    monthlyLease: null,
    annualRent: null,
    insurance: null,
    commissionPercentage: null,
    commission: null
  },
  basicInfo: {
    facadeDirectionId: null,
    badrooms: null,
    bathrooms: null,
    kitchen: false,
    lounge: false,
    streetWidth_LM: null,
    carParking: false,
    constructionYear: "",
    bldgPlanNo: null,
    parcelNo: null,
    titleDeedNo: null,
    insPolicyNo: null
  },
  calculateAmenitiesUnit: [
  ],
  tags: []
})
