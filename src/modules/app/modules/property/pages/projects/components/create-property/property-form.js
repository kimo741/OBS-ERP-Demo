import { ref } from "vue"
import { LocalStorage } from "quasar"
export const create_item_model = ref({
  id: 0,
  typeId: null,
  noOfBlocks: null,
  policiesId: null,
  isActive: true,
  isFavorite: true,
  depulicateNumber: 0,
  constructionYear: "",
  landAreaM2: null,
  buildingAreaM2: null,
  gardenM2: "",
  surface: "",
  garage: "",
  elevators: "",
  northernBorderBy: "",
  southernBorderBy: "",
  easternBorderBy: "",
  westernBorderBy: "",
  projectId: null,
  image: "",
  address: {
    addressLine: "",
    buildingNo: "",
    cityName: "",
    countryId: null,
    regionId: null,
    zipCode: "",
    unifiedNo: "",
    email: "",
    phoneObj: {
      phoneNumber: "",
      countryCode: "",
    },
    longitude: 42.3528328,
    latitude: 25.6242618,
    locationUrl: ""
  },
  contact: {
    name: "",
    contactType: null,
    jopPostition: "",
    companyName: "",
    department: "",
    // website: "",
    idType: null,
    idNo: null,
    remarks: "",
    email: "",
    phoneObj: {
      phoneNumber: "",
      countryCode: "",
    },
  },
  tags: [],
  owners: [
    // {
    //   vendorId: null,
    //   ownerShipRate: null,
    // },
  ],
  translations: [
    {
      languageId: LocalStorage.getItem("defLanguage"),
      name: "",
    },
  ],
  attachments: [
  ],
  blocksFloorsList: [
    {
      blockId: null,
      floors: [],
    },
  ],
  units: [
  ],
});
