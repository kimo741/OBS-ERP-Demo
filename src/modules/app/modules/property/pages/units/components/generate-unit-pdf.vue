<template>
  <div>
    <q-btn
      @click="generatePDF"
      :label="isTelegram ? 'Share to telegram' : 'share to WA'"
      :icon="
        isTelegram ? 'img:/images/telegram.svg' : 'img:/images/whatsapp.svg'
      "
      flat
    />
    <div class="pdf-container">
      <div id="pdfContentUnit">
        <div class="pdf-header">
          <!-- <q-separator class="full-width q-my-md" /> -->
          <img src="images/adminlogo.svg " />
          <q-separator class="full-width q-my-md" />
        </div>
        <div class="pdf-body">
          <div class="section-title full-width">Public Data</div>
          <!-- <div class="row justify-between"> -->

          <div class="feild-width">
            <img
              :src="
                unitForm.image === '' ? '/images/camera.svg' : unitForm.image
              "
              style="width: 100px; height: 100px"
            />
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Name </span> :
            <span class="feild-width__result">
              {{ unitForm.translation[0].name }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Real estate </span> :
            <span class="feild-width__result">
              {{ getLabelById(unitForm.realEstateId, realestateList) }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Real estate </span> :
            <span class="feild-width__result">
              {{ getLabelById(unitForm.status, unitStatusList) }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Description </span> :
            <span class="feild-width__result">
              {{ unitForm.description }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Activation </span> :
            <span class="feild-width__result">
              {{ unitForm.isActive ? Yes : No }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Unit Type </span> :
            <span class="feild-width__result">{{
              getLabelById(unitForm.unitsTypeId, unit_type_opstions)
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Unit Categoty </span> :
            <span class="feild-width__result">{{
              getLabelById(unitForm.unitCategoryId, unit_Categoty_opstions)
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Block </span> :
            <span class="feild-width__result">{{
              getLabelById(unitForm.blockId, blocks_option)
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Floor </span> :
            <span class="feild-width__result">{{
              getLabelById(unitForm.floorId, floors_option)
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Badrooms </span> :
            <span class="feild-width__result">{{ unitForm.badrooms }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Bathrooms </span> :
            <span class="feild-width__result">{{ unitForm.bathrooms }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Kitchen </span> :
            <span class="feild-width__result">
              {{ unitForm.kitchen ? Yes : No }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Lounge </span> :
            <span class="feild-width__result">
              {{ unitForm.lounge ? Yes : No }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Lounge </span> :
            <span class="feild-width__result">
              {{ unitForm.carParking ? Yes : No }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Street Width </span> :
            <span class="feild-width__result">
              {{ unitForm.streetWidth_LM }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> constructionYear </span> :
            <span class="feild-width__result">
              {{ unitForm.constructionYear }}
            </span>
          </div>

          <!-- Lease Cost Info -->
          <div class="section-title">Lease Cost Info</div>
          <div class="feild-width">
            <span class="feild-width__title">areaM2</span> :
            <span class="feild-width__result">{{ unitForm.areaM2 }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> pu </span> :
            <span class="feild-width__result">{{ unitForm.pu }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> net Area M2 </span> :
            <span class="feild-width__result">{{ unitForm.netAreaM2 }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Garden area M2 </span> :
            <span class="feild-width__result">{{ unitForm.gardenAreaM2 }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Balconies Area M2 </span> :
            <span class="feild-width__result">{{
              unitForm.balconiesAreaM2
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Rental price par M2 </span> :
            <span class="feild-width__result">{{
              unitForm.rentalPriceParM2
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> payment Method </span> :
            <span class="feild-width__result">{{
              unitForm.paymentMethod
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Monthly Lease </span> :
            <span class="feild-width__result">{{ unitForm.monthlyLease }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Annual Rent </span> :
            <span class="feild-width__result">{{ unitForm.annualRent }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> insurance </span> :
            <span class="feild-width__result">{{ unitForm.insurance }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Commission </span> :
            <span class="feild-width__result">{{ unitForm.commission }}%</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Commission Percentage </span> :
            <span class="feild-width__result"
              >{{ unitForm.commissionPercentage }}%</span
            >
          </div>

          <!-- <q-separator class="full-width q-my-md" /> -->
          <div class="section-title">Menager</div>
          <div class="feild-width">
            <span class="feild-width__title">Menager name</span> :
            <span class="feild-width__result">{{ unitForm.contact.name }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Job Postition</span> :
            <span class="feild-width__result">{{
              unitForm.contact.jopPostition
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">address Line</span> :
            <span class="feild-width__result">{{
              unitForm.contact.addressLine
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">City</span> :
            <span class="feild-width__result">{{
              unitForm.contact.cityName
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Post Code</span> :
            <span class="feild-width__result">{{
              unitForm.contact.poCode
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Email</span> :
            <span class="feild-width__result">{{
              unitForm.contact.email
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Phone numberv</span> :
            <span class="feild-width__result">{{
              unitForm.contact.phoneObj.phoneNumber
            }}</span>
          </div>
          <!-- <q-separator class="full-width q-my-md" /> -->
          <div class="section-title">Owners</div>
          <div v-for="(item, i) in unitForm.owners" :key="i" class="full-width">
            <template v-if="owners_option.length">
              <div class="feild-width">
                <span class="feild-width__title">Owner name</span> :
                <span class="feild-width__result">{{
                  getLabelById(item.vendorId, owners_option)
                }}</span>
              </div>
              <div class="feild-width">
                <span class="feild-width__title">owner name</span> :
                <span class="feild-width__result"
                  >{{ item.ownerShipRate }}%</span
                >
              </div>
            </template>
            <template>
              <div class="feild-width">Null</div>
            </template>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2pdf from "html2pdf.js";
// import { unitForm } from "./create-dialog/form/unit-model-form.js";
import { Loading } from "quasar";

import { ref, onBeforeMount } from "vue";
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);

import { createNamespacedHelpers } from "vuex-composition-helpers";
const props = defineProps({
  unitForm: {
    type: Object,
    default: () => {},
  },
  realestateList: {
    type: Array,
    default: () => [],
  },
  unitStatusList: {
    type: Array,
    default: () => [],
  },
  unit_type_opstions: {
    type: Array,
    default: () => [],
  },
  unit_Categoty_opstions: {
    type: Array,
    default: () => [],
  },
  floors_option: {
    type: Array,
    default: () => [],
  },
  blocks_option: {
    type: Array,
    default: () => [],
  },
  isTelegram: {
    type: Boolean,
    default: false,
  },
});
const owners_option = ref([]);
const { getVendorsList, savePdf } = propertyAction([
  "getVendorsList",
  "savePdf",
]);
const generatePDF = () => {
  const uriCode = "";
  const element = document.getElementById("pdfContentUnit");
  const options = {
    filename: "generated_pdf.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    // include: ["/src/css/style-for-pdf.css"],
    // pagebreak: { mode: ["css"] },
  };
  // html2pdf().set(options).from(element).outputImg("");
  // html2pdf()
  //   .set(options)
  //   .from(element)
  //   .toPdf()
  //   .output("datauristring")
  //   .then((pdfDataUri) => {
  //     // console.log(pdfDataUri); // The PDF data URI
  //     this.sendPDFToWhatsApp(pdfDataUri);
  //   });
  html2pdf()
    .set(options)
    .from(element)
    .toPdf()
    .output("datauristring")
    .then((pdfDataUri) => {
      // Use the base64-encoded PDF data URI
      console.log(pdfDataUri);
      sendPDFToWhatsApp(pdfDataUri);
    });
};
const convertPDFToDataURI = (pdfDataUri) => {
  return fetch(pdfDataUri)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};
const sendPDFToWhatsApp = (pdfDataUri) => {
  Loading.show();
  // const phoneNumber = "RECIPIENT_PHONE_NUMBER";
  // const encodedUri = encodeURIComponent(pdfDataUri);
  // const whatsappUrl = `whatsapp://send?text= Check out this PDF:${encodedUri} `;
  let indexOfSemiColomn = pdfDataUri.indexOf(",");
  let base64Afterslice = pdfDataUri.slice(Number(indexOfSemiColomn + 1));
  console.log(base64Afterslice);
  // console.log(base64Afterslice);
  // const reader = new FileReader();
  let opj = { pdfFile: base64Afterslice };
  const formdata = new FormData();
  formdata.append("File", base64Afterslice);
  savePdf(opj)
    .then((res) => {
      Loading.hide();
      console.log(res);
      // const whatsappUrl = `https://whatsapp://send?text=$/send?text=Check out this PDF:${res.data}`;
      const whatsappUrl = `whatsapp://send?text=Check out this PDF:${res.data} `;
      const telegramUrl = `https://t.me/share/url?url=${res.data}&text=Check out this PDF`;
      const whatsAppWeb = `https://send?text=Check out this PDF:${res.data} `;
      // window.open(whatsappUrl);
      try {
        props.isTelegram
          ? window.open(telegramUrl, "_blank")
          : (window.location.href = whatsappUrl);
      } catch (err) {
        props.isTelegram
          ? window.open(telegramUrl, "_blank")
          : (window.location.href = whatsAppWeb);
      }
      // const encodedUri = encodeURIComponent(dataUrl);
      // const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this PDF: `;
      // window.open(whatsappUrl);
    })
    .catch((err) => {
      Loading.hide();
      console.log(err);
    });
};
const getLabelById = (id, arr) => {
  let index = arr.findIndex((el) => el.id == id);
  if (index !== -1) {
    return arr[index].label;
  }
};
const getNameById = (id, arr) => {
  let index = arr.findIndex((el) => el.id == id);
  if (index !== -1) {
    return arr[index].label;
  }
};
const getOwnersOptions = () => {
  getVendorsList()
    .then((res) => {
      owners_option.value = res.data.value;
    })
    .catch((_error) => {
      console.log(_error);
    });
};
onBeforeMount(() => {
  getOwnersOptions();
});
</script>

<style>
.pdf-container {
  display: none;
}
/* Your CSS styles here */
/* @media print { */
/* #pdfContentUnit {
  display: none;
} */
/* .pdf-header {
  display: none;
} */
#pdfContentUnit {
  display: block;
  /* background: red !important; */
}
.pdf-header {
  font-size: 22px;
  font-weight: 800;
  margin: auto;
  text-align: center;
  /* color: 2b4c6b; */
  padding: 10px;
}
.pdf-body {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
}
.feild-width {
  width: 47%;
  /* margin-right: calc(10% / 6);
  margin-left: calc(10% / 6); */
  margin-top: 20px;
  /* text-align: center; */
  text-align: start;
}
.feild-width__title {
  font-size: 14px;
  font-weight: bold;
  /* color: #2b4c6b; */
}
.feild-width__result {
  font-size: 12px;
  font-weight: 600;
}
.section-title {
  font-size: 18;
  /* text-decoration: underline; */
  text-align: center;
  width: 100%;
  padding: 15px 0;
  color: #2b4c6b;
  position: relative;
}
.section-title::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background-color: #2b4c6b;
}
/* CSS styles specific to PDF layout */
/* } */
</style>
