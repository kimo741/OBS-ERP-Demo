<template>
  <div class="full-width">
    <div class="full-width justify-end row q-py-md">
      <div class="col-12 text-right">
        <q-btn
          outline
          dense
          padding="0 50px"
          @click="upload_dilaog = true"
          label="Add"
        ></q-btn>
      </div>
    </div>
    <div class="row justify-start items-center fils-container">
      <div
        class="fils-container__file image-container row"
        v-for="(file, i) in reviewAttachments"
        :key="i"
      >
        <!-- preview="file.file"
      :square="true" -->
        <!-- <obs-avatar-field
          v-model="file.file"
          @passAssFile="getImage"
          style="display: block"
        /> -->
        <!-- <div class="image-container"> -->
        <!-- {{ file }} -->
        <div class="text-center image-container__bar col-12 row">
          <div class="col-4 text-left flex">
            <q-icon
              style="color: #53b9ea; cursor: pointer"
              size="xs"
              name="eva-close-outline"
              @click="deleteFile(i)"
            />
          </div>
          <div class="col-4 text-center">{{ file.docName }}</div>
          <div class="col-4 text-right flex justify-end">
            <q-icon
              style="color: #53b9ea; cursor: pointer"
              size="xs"
              color="#53B9EA"
              name="download"
              @click="downloadFile(file)"
            />
          </div>
        </div>
        <div class="image-container__img col-12">
          <img :src="file.file" />
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- upload dialog -->
    <q-dialog
      v-model="upload_dilaog"
      transition-show="scale"
      transition-hide="scale"
      persistent
    >
      <q-card class="q-pa-lg">
        <q-card-section
          class="text-left"
          style="font-size: 17px; font-weight: 500"
        >
          Add photo
        </q-card-section>
        <q-form @submit.prevent="addAttachment">
          <q-card-section
            class="text-left row full-with"
            style="font-size: 17px; font-weight: 500"
          >
            <div class="col-12 q-my-md">
              <q-input label="Document Name" v-model="fileDetail.docName" />
            </div>
            <div class="col-6 q-my-md">
              <a
                style="cursor: pointer"
                class="text-blue-3"
                @click="handleButtonClick"
                >Upload photo</a
              >
            </div>
            <div class="col-6">
              <q-img :src="filsReview" style="width: 100%; height: 100%" />
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="blue-5"
              dense
              padding="0 40px"
              type="submit"
              label="Submit"
            />
            <q-btn
              dense
              padding="0 40px"
              label="Discard"
              outline
              color="grey-7"
              @click="upload_dilaog = false"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { unitForm } from "../form/unit-model-form";
const props = defineProps({
  attachmentData: Array,
});
// form_data.value.drawings
const attachments = ref([]);
const reviewAttachments = ref([]);
const filsReview = ref("");
const fileDetail = ref({ docName: "", fileBase64: "", date: "", docNum: "" });
// {
//   id: null,
//   fileBase64: "",
//   docNum: "",
//   docName: "",
//   date: ""
// }
const urlFile = ref("");
const upload_dilaog = ref(false);
const handleButtonClick = () => {
  const input = document.createElement("input");

  // input.setAttribute("accept", "image/*");
  input.setAttribute("type", "file");
  input.onchange = handleInputChange;
  input.click();
};
const handleInputChange = (event) => {
  const [image] = event.target.files;
  // emit("passAssFile", image);
  filsReview.value = URL.createObjectURL(image);

  if (image) {
    const reader = new FileReader();
    const url = reader.readAsDataURL(image);
    reader.onload = () => {
      const { result } = reader;
      // previewData.value = result;
      // console.log(URL.createObjectURL(event.target.files[0]););
      fileDetail.value.fileBase64 = result;
    };
    // imgUrl.value = reader.readAsDataURL(image);
    reader.onerror = (error) => {};
  }
};

const addAttachment = () => {
  unitForm.value.unitPhotos.push(fileDetail.value);
  reviewAttachments.value.push({
    file: filsReview.value,
    name: fileDetail.value.docName,
    base64: fileDetail.value.fileBase64,
  });
  fileDetail.value = { docName: "", fileBase64: "", date: "", docNum: "" };
  upload_dilaog.value = false;
};
const deleteFile = (index) => {
  reviewAttachments.value.splice(index, 1);
};
const downloadFile = (file) => {
  var link = document.createElement("a");
  link.href = file.file;
  link.download = `${file.name}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="scss" scoped>
.fils-container {
  &__file {
    // width: calc(95% / 4);
  }
}
.image-container {
  // position: relative;
  height: 100%;
  width: calc(95% / 4);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  &__img {
    // position: absolute;
    // left: 0;
    // top: 10%;
    // width: 100%;
    height: 90%;
    img {
      width: 100%;
      height: 100%;
    }
    // transform: translate(-10%, -50%);
  }
  &__bar {
    // position: absolute;
    // top: 0;
    // left: 0;
    height: 10%;
    width: 100%;
  }
}
</style>
