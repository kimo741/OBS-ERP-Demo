<template>
  <div>
    <button @click="generatePDF">Generate PDF</button>
    <div class="pdf-container">
      <div id="pdfContent">
        <div class="pdf-header">
          <!-- <q-separator class="full-width q-my-md" /> -->
          <img src="images/adminlogo.svg " />
          <q-separator class="full-width q-my-md" />
        </div>
        <div class="pdf-body">
          <div class="feild-width">
            <span class="feild-width__title"> name </span> :
            <span class="feild-width__result"> name 1 </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> adderss </span> :
            <span class="feild-width__result">address 1 </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title">type </span> :
            <span class="feild-width__result"> type 1 </span>
          </div>
          <div class="feild-width">
            <span class="feild-width__title"> title </span> :
            <span class="feild-width__result"> title 1 </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {};
  },
  methods: {
    generatePDF() {
      const uriCode = "";
      const element = document.getElementById("pdfContent");
      const options = {
        filename: "generated_pdf.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        include: ["/src/css/style-for-pdf.css"],
        pagebreak: { mode: ["css"] },
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
      html2pdf().set(options).from(element).toPdf().save();
    },
    convertPDFToDataURI(pdfDataUri) {
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
    },
    sendPDFToWhatsApp(pdfDataUri) {
      const phoneNumber = "RECIPIENT_PHONE_NUMBER";
      // const encodedUri = encodeURIComponent(pdfDataUri);
      // const whatsappUrl = `whatsapp://send?text= Check out this PDF:${encodedUri} `;
      this.convertPDFToDataURI(pdfDataUri).then((dataUrl) => {
        console.log(dataUrl);
        const encodedUri = encodeURIComponent(dataUrl);
        const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this PDF: ${encodedUri}`;
        window.open(whatsappUrl);
      });
    },
  },
};
</script>

<style >
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
  color: blue;
  padding: 10px;
}
.pdf-body {
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.feild-width {
  width: calc(90% / 3);
  margin-right: calc(10% / 6);
  margin-left: calc(10% / 6);
  margin-top: 20px;
  text-align: center;
}
.feild-width__title {
  font-size: 16px;
  font-weight: bold;
  color: #2b4c6b;
}
.feild-width__result {
  font-size: 14px;
  font-weight: 600;
}
/* CSS styles specific to PDF layout */
/* } */
</style>
