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
      <div id="pdfContent">
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
                form_data.imageUrl ? form_data.imageUrl : '/images/camera.svg'
              "
              style="width: 100px; height: 100px"
            />
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Name </span> :
            <span class="feild-width__result">
              {{ form_data.translation[0].name }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Descraption </span> :
            <span class="feild-width__result">
              {{ form_data.descraption }}
            </span>
          </div>
          <!-- <div class="feild-width">
            <span class="feild-width__title">Phone Num</span> :
            <span class="feild-width__result">{{
              form_data.phoneObj.phoneNumber
            }}</span>
          </div> -->
          <div class="feild-width">
            <span class="feild-width__title">Number of properties</span> :
            <span class="feild-width__result">{{
              form_data.realEstates.length
            }}</span>
          </div>
          <!-- <div class="feild-width">
            <span class="feild-width__title"> is Favorite </span> :
            <span class="feild-width__result">
              {{ create_item_model.isFavorite ? Yes : No }}
            </span>
          </div>

          <div class="feild-width">
            <span class="feild-width__title"> Land area M2 </span> :
            <span class="feild-width__result">{{
              create_item_model.landAreaM2
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> building Area M2 </span> :
            <span class="feild-width__result">{{
              create_item_model.buildingAreaM2
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> garden M2 </span> :
            <span class="feild-width__result">{{
              create_item_model.gardenM2
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Surface </span> :
            <span class="feild-width__result">{{
              create_item_model.surface
            }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> Garage </span> :
            <span class="feild-width__result">{{
              create_item_model.garage
            }}</span>
          </div> -->
          <!-- <q-separator class="full-width q-my-md" /> -->
          <div class="section-title">Address</div>
          <div class="feild-width">
            <span class="feild-width__title">Address Line</span> :
            <span class="feild-width__result">{{ form_data.addressLine }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> City </span> :
            <span class="feild-width__result">{{ form_data.city }}</span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Country </span> :
            <span class="feild-width__result">
              {{
                // getLabelById(create_item_model.address.regionId, ragion_list)
                getLabelById(form_data.countryId, cuntriesOpstion)
              }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">Ragion </span> :
            <span class="feild-width__result">
              {{
                // getLabelById(create_item_model.address.regionId, ragion_list)
                getLabelById(form_data.countryId, ragionList)
              }}
            </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">postCode </span> :
            <span class="feild-width__result">
              {{
                // getLabelById(create_item_model.address.regionId, ragion_list)
                form_data.postCode
              }}
            </span>
          </div>

          <!-- <q-separator class="full-width q-my-md" /> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import html2pdf from "html2pdf.js";
import { form_data } from "../composables/reaquist.js";
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { Loading } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { savePdf } = propertyAction(["savePdf"]);
const props = defineProps({
  cuntriesOpstion: {
    type: Array,
    default: () => [],
  },
  ragionList: {
    type: Array,
    default: () => [],
  },
  isTelegram: {
    type: Boolean,
    default: false,
  },
});
const generatePDF = () => {
  const uriCode = "";
  const element = document.getElementById("pdfContent");
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
</script>

<style scoped>
.pdf-container {
  display: none;
}
/* Your CSS styles here */
/* @media print { */
/* #pdfContent {
  display: none;
} */
/* .pdf-header {
  display: none;
} */
#pdfContent {
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
