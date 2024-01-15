import { ref } from "vue";

export const unitForm = ref({
  id: 0,
  realEstateId: 0,
  unitsTypeId: null,
  sizeMater: null,
  sizeFoot: null,
  unitCategoryId: null,
  blockId: null,
  floorId: null,
  usageFormId: null,
  badrooms: null,
  bathrooms: null,
  amenityId: null,
  status: 2,
  urlImage: "",
  owners: [
    // {
    //   vendorId: null,
    //   ownerShipRate: null,
    // },
  ],
  contact: {
    name: "",
    jopPostition: "",
    idType: null,
    idNo: null,
    email: "",
    phoneObj: {
      phoneNumber: "",
      countryCode: "",
    },
  },
  attachments: [
    // {
    //   id: 0,
    //   fileBase64: "",
    //   docNum: "",
    //   docName: "",
    //   date: "",
    //   url: "",
    // },
  ],
  translation: [
    {
      languageId: 0,
      name: "",
    },
  ],
  // longitude: "",
  // latitude: "",
});

/////////////////////
