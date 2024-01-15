import { ref } from "vue";

export const sellected_group = ref([]);
export const PagenationTotalPages = ref(1)
export const inquiryForm = ref({
  filter: {
    actionsTypes: 1,
    location: "",
    unitsTypeId: null,
    unitCategoryId: null,
    unitModelId: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    facadeDirectionId: null,
    view: true,
    badrooms: null,
    bathrooms: null,
    lounge: null,
    kitchen: null,
    projectId: null,
  },
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
});
