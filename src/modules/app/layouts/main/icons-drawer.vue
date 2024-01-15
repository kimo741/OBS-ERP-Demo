<template>
  <!-- <q-footer
    class="q-pa-lg row justify-between items-center"
    :class="{
      'bg-white text-grey-7': !$q.dark.isActive,
      'bg-dark-blue-5 text-dark-move-2': $q.dark.isActive,
    }"
  >
    <p class="text-subtitle2 no-margin">&copy; OBS 2022</p>
    <div class="flex q-gutter-x-md">
      <q-btn
        rounded
        unelevated
        color="instagram"
        size="sm"
        :href="instagramLink"
        target="_blank"
      >
        <img src="/images/instagram.png" width="17" height="17" />
      </q-btn>
      <q-btn
        rounded
        unelevated
        color="facebook"
        size="sm"
        icon="facebook"
        :href="facebookLink"
        target="_blank"
      />
    </div>
  </q-footer> -->
  <q-drawer
    show-if-above
    side="right"
    class="text-center q-pr-xs"
    :model-value="isActive"
    @update:model-value="handleUpdateDrawerIsActive"
    :width="100"
  >
    <!-- :mini="isMini"
    <q-scroll-area style="height: calc(100% - (65px + 55px + 75px))"> -->
    <!-- <q-btn round unelevated color="instagram" size="sm" :href="instagramLink" target="_blank" class="q-mr-sm q-mt-sm">
      <img src="/images/instagram.png" width="17" height="17" />
    </q-btn> -->
    <div
      class="q-pt-md column justify-center items-center full-height"
      style="overflow-y: auto; flex-wrap: nowrap"
    >
      <div
        v-for="(item, index) in drawerItems"
        :key="index"
        class="q-mb-sm drawer-icon"
        :class="
          item.link == componentModel && componentModel !== ''
            ? 'active-drawer'
            : ''
        "
      >
        <q-btn
          rounded
          flat
          class=""
          :size="item.link == componentModel ? 'lg' : ''"
          padding="0"
          @click="handelModelComponent(item.link)"
        >
          <!-- :href="item.link" target="_blank" -->
          <img :src="item.img" />
        </q-btn>
        <div>
          <span class="icon-heading">{{ item.heading }}</span>
        </div>
      </div>
    </div>

    <!-- <q-btn round unelevated color="facebook" size="sm" icon="facebook" :href="facebookLink" target="_blank"
      class="q-mr-sm q-mt-sm" /> -->
    <!-- <ucp-drawer-list
        v-for="(menu, index) in menus"
        :key="index"
        :items="menu.items"
        :label="menu.label"
      /> -->
    <!-- </q-scroll-area> -->
  </q-drawer>
  <q-dialog
    v-model="contactFormDialog"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
  >
    <!-- v-close-popup -->
    <!-- <contactCreate  /> -->
  </q-dialog>
  <!-- <q-drawer
    v-model="DialogModel"
    style="right: 100px"
    side="right"
    behavior
    overlay
    width="400"
    class="text-center q-pr-xs historty-drawer"
  > -->
  <transition-group name="slide-drawer">
    <div
      class="history-dialog"
      v-if="DialogModel"
      style="background-color: #edf3f8"
    >
      <component
        :data="contactData"
        :isEdit="isEdit"
        :readOnly="readOnly"
        :is="componentModel"
        @closeDrawer="closeDrawer"
        @contactForm="contactForm"
        @updateContact="updateContact"
        @contactMoreDetails="contactMoreDetails"
        @closeCreateContact="closeCreateContact"
        class="max-index"
      />
    </div>
  </transition-group>

  <!-- </q-drawer> -->
  <!-- </q-dialog> -->
</template>

<script>
// import components from "src/pages/studio/components.vue";
import { defineComponent, ref } from "vue";
import toDoTask from "../../components/right-drawer/toDoTask.vue";
import recent from "../../components/right-drawer/recent.vue";
import favorits from "../../components/right-drawer/favorits.vue";
import siteLinks from "../../components/right-drawer/site-links.vue";
import contactCreate from "../../components/right-drawer/contact/contactCreate.vue";
import contact from "../../components/right-drawer/contact";
export default defineComponent({
  components: { toDoTask, recent, favorits, siteLinks, contactCreate, contact },
  setup() {
    const DialogModel = ref(false);
    const readOnly = ref(false);
    const isEdit = ref(false);
    const contactData = ref({});
    // const dialogContactForm = ref(false);
    const contactFormDialog = ref(false);
    const componentModel = ref("");
    const drawerItems = [
      {
        img: "/images/recent.svg",
        heading: "Recent",
        link: "recent",
      },
      {
        img: "/images/favourites.svg",
        heading: "Favourites",
        link: "favorits",
      },
      {
        img: "/images/notes.svg",
        heading: "Notes",
        link: "toDoTask",
      },
      {
        img: "/images/requests.svg",
        heading: "Request",
        link: "",
      },
      {
        img: "/images/contacts.svg",
        heading: "Contacts",
        link: "contact",
      },
      {
        img: "/images/links.svg",
        heading: "Links",
        link: "siteLinks",
      },
      {
        img: "/images/folders.svg",
        heading: "Folders",
        link: "",
      },
      {
        img: "/images/googledrive.svg",
        heading: "G-Drive",
        link: "",
      },
      {
        img: "/images/dropbox.svg",
        heading: "Dropbox",
        link: "",
      },
      {
        img: "/images/whatsapp.svg",
        heading: "Whatsapp",
        link: "whatsapp",
      },
      {
        img: "/images/telegram.svg",
        heading: "Telegram",
        link: "Telegram",
      },
      {
        img: "/images/wechat.svg",
        heading: "Wechat",
        link: "",
      },
      {
        img: "/images/edit.svg",
        heading: "Edit",
        link: "",
      },
    ];
    const contactForm = () => {
      // contactFormDialog.value = true;
      readOnly.value = false;
      isEdit.value = false;
      componentModel.value = "contactCreate";
    };
    const handelModelComponent = (comp) => {
      if (comp == "whatsapp") {
        window.open(
          "https://web.whatsapp.com/",
          // "_blank",
          "width=300, height=300"
        );
      } else if (comp == "Telegram") {
        window.open(
          "https://web.telegram.org/a/",
          // "_blank",
          "width=300, height=300"
        );
      } else if (componentModel.value == comp) {
        DialogModel.value = !DialogModel.value;
        componentModel.value = "";
      } else {
        componentModel.value = comp;
        DialogModel.value = true;
      }
    };
    const closeCreateContact = () => {
      componentModel.value = "contact";
    };
    const updateContact = (data) => {
      readOnly.value = false;
      isEdit.value = true;
      contactData.value = data;
      console.log(data);
      componentModel.value = "contactCreate";
    };
    const contactMoreDetails = (data) => {
      updateContact(data);
      // console.log(data);
      // isEdit.value = false;
      // readOnly.value = true;
      // contactData.value = data;
      // componentModel.value = "contactCreate";
    };
    const closeDrawer = () => {
      DialogModel.value = !DialogModel.value;
      componentModel.value = "";
    };
    return {
      drawerItems,
      DialogModel,
      closeCreateContact,
      updateContact,
      contactFormDialog,
      componentModel,
      contactMoreDetails,
      // dialogContactForm,
      handelModelComponent,
      closeDrawer,
      contactForm,
      readOnly,
      isEdit,
      contactData,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-dialog {
  position: fixed;
  right: 100px;
  width: 400px;
  height: calc(100% - 83px);
  bottom: 0;
  top: 83px;
  z-index: 100;
  overflow-y: auto;
}
.icon-heading {
  opacity: 0;
  color: #000000;
  font-size: 12px;
  transition: all 0.4s linear;
  width: 0;
}
.drawer-icon:hover {
  transition: all 0.4s linear;
  .icon-heading {
    opacity: 1;
    width: auto;
  }
}

.drawer-style {
  margin-right: 100px;
}
// .q-drawer:has(.historty-drawer) {
//   right: 100px !important;
//   transform: translateX(-100px);
// }
.active-drawer {
  background-color: #2b4c6b59;
  border-radius: 10px;
}
.max-index {
  z-index: 101;
}
</style>
