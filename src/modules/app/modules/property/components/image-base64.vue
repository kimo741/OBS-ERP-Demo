<template>
  <div class="column justify-center items-center">
    <q-avatar
      style="
        position: relative;
        width: 250px;
        height: 250px;
        border: 1px solid #ccc;
        border-radius: 15px;
      "
      :square="square"
      class="avatar-picker-cover q-mb-sm"
    >
      <!-- <q-icon
        name="eva-close-outline"
        @click="deleteImg"
        v-show="previewData"
        class="avatar-picker-cover-del"
      /> -->

      <img
        class=""
        v-if="imageUrl"
        :src="imageUrl"
        style="
          width: 90%;
          height: 80%;
          position: absolute;
          left: 50%;
          top: 10px;
          transform: translateX(-50%);
        "
      />
      <img
        v-else
        style="
          width: 60%;
          height: 60%;
          position: absolute;
          left: 50%;
          top: 10px;
          transform: translateX(-50%);
        "
        :src="person ? '/images/person-placeholder.jpg' : '/images/camera.svg'"
      />
      <div style="" class="row justify-between image-actions" v-if="square">
        <div class="col-3 text-center image-actions_btn">
          <q-icon
            @click="handleButtonClick"
            style="cursor: pointer"
            size="xs"
            name="add"
            color="blue"
          />
        </div>
        <div class="col-3 text-center image-actions_btn">
          <q-icon
            style="cursor: pointer"
            size="xs"
            color="black"
            name="download"
            @click="downloadImage"
          />
        </div>
        <!-- <div class="col-3 text-center image-actions_btn">
          <q-icon
            style="cursor: pointer"
            size="sm"
            name="img:/images/whatsapp.svg"
            @click="shareToWhatsapp"
          />
        </div> -->
        <div class="col-3 text-center image-actions_btn">
          <q-icon
            style="cursor: pointer"
            size="xs"
            name="delete"
            color="red-4"
            @click="deleteImg"
          />
        </div>
      </div>
    </q-avatar>
    <div class="row justify-between" v-if="!square">
      <q-btn
        @click="handleButtonClick"
        :disable="disable"
        flat
        :label="label"
        padding="xs"
        class="replace-btn"
      >
        <!-- class="avatar-picker-cover-del" -->

        <img class="q-mr-sm" src="/images/upload.svg" /> Replace
      </q-btn>
      <q-btn
        icon="eva-close-outline"
        @click="deleteImg"
        v-show="imageUrl"
        label="Clear"
        text-color="red"
        flat
      />
    </div>
  </div>
</template>

<script>
import { useObsField } from "src/composables/fields";
import { ref, toRef } from "vue";
import { colors, Notify } from "quasar";

export default {
  props: {
    person: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    imageBase64: {
      type: String,
      required: false,
    },
    // modelValue: {
    //   type: String,
    //   default: null,
    // },
    // preview: {
    //   type: String,
    //   default: null,
    // },
    // label: {
    //   type: String,
    //   default: null,
    // },
    clearable: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    square: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const imgUrl = ref("");
    // const previewData = toRef(props, "preview");
    // const { fieldValue, handleChange } = useObsField();

    const handleButtonClick = () => {
      const input = document.createElement("input");
      input.setAttribute("accept", "image/*");
      input.setAttribute("type", "file");
      input.onchange = handleInputChange;
      input.click();
    };

    const handleInputChange = (event) => {
      const [image] = event.target.files;
      // emit("passAssFile", image);
      let imgUrl = URL.createObjectURL(image);
      emit("update:imageUrl", imgUrl);
      if (image) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(image);
        reader.onload = () => {
          const { result } = reader;
          let indexOfSemiColomn = result.indexOf(",");
          let base64Afterslice = result.slice(Number(indexOfSemiColomn + 1));
          console.log(base64Afterslice);
          return emit("update:imageBase64", base64Afterslice);
          // fileDetail.value.url = url;
        };
        // imgUrl.value = reader.readAsDataURL(image);
        reader.onerror = (error) => {
          console.log(error);
        };
      }
    };
    const deleteImg = () => {
      // previewData.value = "";
      emit("update:imageBase64", "");
      emit("update:imageUrl", "");
    };
    const downloadImage = () => {
      if (prop.imageUrl !== "") {
        var link = document.createElement("a");
        link.href = prop.imageUrl;
        link.download = "Download.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    const shareToWhatsapp = () => {
      console.log(prop.imageUrl);
      if (prop.imageUrl) {
        console.log(prop.imageUrl);
        const encodedCaption = encodeURIComponent("image from obs");
        const encodedFileUrl = encodeURIComponent(prop.imageUrl);
        const whatsappUrl = `whatsapp://send?text=${encodedFileUrl}`;
        window.location.href = whatsappUrl;
      } else {
        Notify.create({
          message: "Not found link to shre it",
          colors: "red",
          textColor: "red",
          position: "bottom",
          timeout: 8000,
          classes: "notify-size",
        });
      }
    };
    return {
      // fieldValue,
      handleButtonClick,
      downloadImage,
      // previewData,
      deleteImg,
      handleInputChange,
      shareToWhatsapp,
      imgUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-picker-cover {
  &-del {
    position: absolute;
    right: 0;
    top: 0;
  }
  position: relative;
  img {
    object-fit: cover;
  }
}
.image-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  // &:hover &_btn {
  //   visibility: visible;
  //   margin-top: 0;
  //   opacity: 1;
  // }
  &_btn {
    transition: all 0.3s linear;
    visibility: hidden;
    margin-top: 50px;
    z-index: 20;
    opacity: 0;
  }
}
.avatar-picker-cover:hover .image-actions_btn {
  visibility: visible;
  margin-top: 0;
  opacity: 1;
}
.replace-btn {
  color: #53b9ea;
}
</style>
