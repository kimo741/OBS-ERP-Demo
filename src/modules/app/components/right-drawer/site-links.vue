<template>
  <q-card class="full-height" style="background-color: #335471">
    <q-card-section class="set-dialog-bg q-pa-lg row">
      <div class="text-h4 text-white">Links</div>
      <q-space />
      <q-btn
        icon="eva-arrow-forward-outline"
        color="white"
        size="lg"
        flat
        round
        dense
        @click="closeDrawer"
      />
    </q-card-section>
    <q-card-section class="q-px-lg set-dialog-bg">
      <div class="text-h4">
        <q-btn
          class="btn-component text-white"
          style="color: #ca79c6"
          label="Create"
          icon="eva-plus-square-outline"
          size="md"
          @click="handelCreateDialog"
        />
      </div>
    </q-card-section>

    <q-card-section
      v-if="linksList.length"
      class="q-pa-lg bg-white"
      style="position: relative"
    >
      <div
        class=""
        style="padding:10px; !important; margin:10px !important; position: relative ; "
        v-for="(link, i) in linksList"
        :key="i"
      >
        <q-btn
          dense
          text-color="red"
          color="grey-7"
          icon="delete"
          round
          flat
          class="more_info_btn"
          @click="deleteNote(link)"
        >
          <!-- <q-menu
            fit
            auto-close
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list bordered separator style="min-width: 200px">
              <q-item clickable @click="handelUpdateNote(note)">
                <q-item-section>edit</q-item-section>
              </q-item>
              <q-item clickable @click="deleteNote(link)">
                <q-item-section>delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu> -->
        </q-btn>
        <div class="text-body2 task-body pointer" @click.once="openLink(link)">
          {{ link.name }}
        </div>
        <div class="row justify-between q-my-md items-center">
          <!-- <q-badge rounded v-if="note.isEnd" label="Is End" color="red" />
          <q-badge v-else style="height: 10px" label="Is End" color="green" /> -->
          <!-- <q-input
            v-model="note.reminderIn"
            label="reminder In"
            dense
            disable
            filled
          /> -->
          <div @click.once="openLink(link)" class="text-hint text-grey pointer">
            {{ link.url }}
          </div>
          <!-- <div class="text-hint">{{ note.reminderIn }}</div> -->
        </div>
        <q-separator color="#2b4c6b" />
      </div>
    </q-card-section>
    <q-card-section
      v-else-if="isPending"
      class="row justify-center items-center"
    >
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </q-card-section>
    <q-card-section v-else class="row justify-center text-center text-">
      No Data found
    </q-card-section>
    <q-dialog
      v-model="formDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
      persistent
      style="width: 50%"
    >
      <q-card class="full-width">
        <q-card-section v-if="isEdit" class="set-dialog-bg q-pa-lg">
          <div class="text-h5 text-white">Edit Link</div>
        </q-card-section>
        <q-card-section v-else class="q-pa-lg set-dialog-bg">
          <div class="text-h5 text-white">Create Link</div>
        </q-card-section>
        <q-form @submit="handelSupmit">
          <q-card-section class="bg-white q-ma-md">
            <div class="q-ma-md">
              <q-input
                v-model="createLink.name"
                clearable
                filled
                range
                type="text"
                label="link names"
                :rules="[(val) => val.length || 'Link name Is Required']"
              />
            </div>
            <div class="q-ma-md">
              <!-- <div class="text-body2 text-grey-6">Reminder In</div> -->
              <q-input
                filled
                clearable
                type="text"
                range
                label="url"
                v-model="createLink.url"
                :rules="[(val) => val.length || 'url Is Required']"
              />
            </div>
            <!-- <div class="q-ma-md">
              <q-toggle label="Is End" v-model="createLink.isEnd" />
            </div> -->
          </q-card-section>

          <q-card-actions align="right" class="text-teal q-pa-md">
            <!-- <q-btn
            v-if="isEdit"
            class="q-ml-md btn-component"
            padding="10px 20px"
            color="green"
            unelevated
            :to="to"
            no-caps
            :label="$t('global.edit')"
            v-close-popup
            @click="confirmUpdateNote"
          /> -->
            <q-btn
              class="q-ml-md btn-component"
              type="submit"
              style="color: black"
              padding="10px 20px"
              :color="isEdit ? 'green' : 'primary'"
              unelevated
              no-caps
              outline
              :label="isEdit ? $t('global.edit') : $t('global.save')"
            />
            <!-- <q-btn
            v-else
            class="q-ml-md btn-component"
            padding="10px 20px"
            unelevated
            color="primary"
            :to="to"
            no-caps
            :label="$t('global.create')"
            v-close-popup
            @click="confirmCreateNote"
          /> -->
            <q-btn
              class="q-ml-md btn-component"
              size="md"
              padding="10px 20px"
              style="color: black"
              unelevated
              :to="to"
              no-caps
              :label="$t('global.cancel')"
              outline
              v-close-popup
              @click="create_dialog = false"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers("AppModule");
import { LocalStorage, Dialog } from "quasar";
import { APP_SETTINGS_KEY } from "configs/storage";

export default {
  setup(prop, { emit }) {
    const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
    const linksList = ref([]);
    const isEdit = ref(false);
    const isPending = ref(false);
    const formDialog = ref(false);
    const createLink = ref({
      name: null,
      url: "",
    });
    const { getLinks, createSiteLink, deleteSiteLink } = useActions([
      "getLinks",
      "createSiteLink",
      "deleteSiteLink",
    ]);
    const handelSupmit = () => {
      // if (isEdit.value) {
      //   confirmUpdateNote();
      // } else {
      confirmCreateNote();
      // }
    };
    const handelCreateDialog = () => {
      createLink.value = {
        userId: LocalStorage.getItem("user-id"),
        comapnyId: setting.profile.companyId,
        name: null,
        url: "",
      };
      isEdit.value = false;
      formDialog.value = true;
    };
    const getLinksList = async () => {
      isPending.value = true;
      getLinks()
        .then((res) => {
          isPending.value = false;
          linksList.value = res.data.value;
          console.log(linksList.value);
        })
        .catch((_error) => {
          isPending.value = false;
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const confirmCreateNote = async () => {
      createSiteLink(createLink.value)
        .then((res) => {
          getLinksList();
          formDialog.value = false;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    // const confirmUpdateNote = async () => {
    //   updateToDoTasks(createLink.value)
    //     .then((res) => {
    //       formDialog.value = false;
    //       getLinksList();
    //     })
    //     .catch((_error) => {
    //       console.log(
    //         _error.data.errorMessage ? _error.data.errorMessage : _error.data
    //       );
    //     });
    // };
    const deleteNote = (item) => {
      Dialog.create({
        title: `Confirm Deleting link`,
        message: "Would you like to delete this link?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        confirmDeleteLink(item);
      });
    };
    const confirmDeleteLink = async (link) => {
      // console.log(link);
      deleteSiteLink(link.id)
        .then((res) => {
          formDialog.value = false;
          getLinksList();
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const openLink = (link) => {
      window.open(`${link.url}`, "_blank");
    };
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    onMounted(() => {
      getLinksList();
    });
    return {
      model: ref(""),
      createLink,
      date: ref("2023-04-04T02:46:03.387Z"),
      formDialog,
      handelCreateDialog,
      isEdit,
      openLink,
      getLinksList,
      // handelUpdateNote,
      confirmCreateNote,
      // confirmUpdateNote,
      confirmDeleteLink,
      isPending,
      linksList,
      handelSupmit,
      closeDrawer,
      setting,
      deleteNote,
    };
  },
};
</script>

<style>
.poredr-card {
  border: 1.5px solid #a5a5a58c;
  border-radius: 10px;
}
.more_info_btn {
  position: absolute;
  right: 5px;
  top: 5px;
}
.set-dialog-bg {
  background-color: #2b4c6b;
}
.task-body {
  /* text-overflow: ; */
  word-wrap: break-word;
  width: 90%;
  flex-wrap: wrap;
}
.pointer {
  cursor: pointer;
}
</style>
