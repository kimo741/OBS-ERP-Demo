<template>
  <q-card class="full-height" style="background-color: #edf3f8">
    <q-card-section class="set-dialog-bg q-pa-lg row">
      <div class="text-h4 text-white">Notes</div>
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
      v-if="notesList.length"
      class="q-pa-lg"
      style="position: relative; background-color: #edf3f8"
    >
      <div
        class=""
        style="padding:10px; !important; margin:10px !important; position: relative ;"
        v-for="(note, i) in notesList"
        :key="i"
      >
        <q-btn
          dense
          text-color="grey-6"
          color="grey-7"
          size="1em"
          round
          flat
          class="more_info_btn"
          icon="more_vert"
        >
          <q-menu
            fit
            auto-close
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list bordered separator style="min-width: 200px">
              <q-item clickable @click="handelUpdateNote(note)">
                <q-item-section>edit</q-item-section>
              </q-item>
              <q-item clickable @click="deleteNote(note)">
                <q-item-section>delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <div class="text-body2 task-body">
          {{ note.task }}
        </div>
        <div class="row justify-between q-my-md items-center">
          <q-badge rounded v-if="note.isEnd" label="Is End" color="red" />
          <q-badge v-else style="height: 10px" label="Is End" color="green" />
          <!-- <q-input
            v-model="note.reminderIn"
            label="reminder In"
            dense
            disable
            filled
          /> -->
          <div class="text-hint text-grey">{{ note.reminderIn }}</div>
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
    >
      <q-card class="">
        <q-card-section v-if="isEdit" class="set-dialog-bg q-pa-lg">
          <div class="text-h5 text-white">Edit Note</div>
        </q-card-section>
        <q-card-section v-else class="q-pa-lg set-dialog-bg">
          <div class="text-h5 text-white">Create Note</div>
        </q-card-section>
        <q-form @submit="handelSupmit">
          <q-card-section class="bg-white q-ma-md">
            <div class="q-ma-md">
              <q-input
                v-model="createNote.task"
                dense
                clearable
                filled
                range
                type="textarea"
                label="Task"
                :rules="[(val) => val.length || 'Task Is Required']"
              />
            </div>
            <div class="q-ma-md">
              <div class="text-body2 text-grey-6">Reminder In</div>
              <q-input
                dense
                filled
                placeholder="Reminder In"
                clearable
                type="datetime-local"
                range
                v-model="createNote.reminderIn"
              />
            </div>
            <div class="q-ma-md">
              <q-toggle label="Is End" v-model="createNote.isEnd" />
            </div>
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
import { LocalStorage, Loading } from "quasar";
import { APP_SETTINGS_KEY } from "configs/storage";

export default {
  setup(prop, { emit }) {
    const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
    const notesList = ref([]);
    const isPending = ref(false);
    const isEdit = ref(false);
    const formDialog = ref(false);
    const createNote = ref({
      userId: LocalStorage.getItem("user-id"),
      comapnyId: setting.profile.companyId,
      reminderIn: null,
      task: "",
      isEnd: false,
    });
    const { getNotes, createToDoTasks, updateToDoTasks, deleteToDoTasks } =
      useActions([
        "getNotes",
        "createToDoTasks",
        "updateToDoTasks",
        "deleteToDoTasks",
      ]);
    const handelSupmit = () => {
      if (isEdit.value) {
        confirmUpdateNote();
      } else {
        confirmCreateNote();
      }
    };
    const handelCreateDialog = () => {
      createNote.value = {
        userId: LocalStorage.getItem("user-id"),
        comapnyId: setting.profile.companyId,
        reminderIn: null,
        task: "",
        isEnd: false,
      };
      isEdit.value = false;
      formDialog.value = true;
    };
    const handelUpdateNote = (note) => {
      createNote.value = note;
      isEdit.value = true;
      formDialog.value = true;
    };
    const getNotesList = async () => {
      isPending.value = true;
      getNotes()
        .then((res) => {
          isPending.value = false;
          notesList.value = res.data.value;
          console.log(notesList.value);
        })
        .catch((_error) => {
          isPending.value = false;
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const confirmCreateNote = async () => {
      Loading.show();
      createToDoTasks(createNote.value)
        .then((res) => {
          Loading.hide();
          getNotesList();
          formDialog.value = false;
        })
        .catch((_error) => {
          Loading.hide();
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const confirmUpdateNote = async () => {
      Loading.show();
      updateToDoTasks(createNote.value)
        .then((res) => {
          Loading.hide();
          formDialog.value = false;
          getNotesList();
        })
        .catch((_error) => {
          Loading.hide();
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const deleteNote = async (note) => {
      Loading.show();
      deleteToDoTasks(note.id)
        .then((res) => {
          Loading.hide();
          formDialog.value = false;
          getNotesList();
        })
        .catch((_error) => {
          Loading.hide();
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    onMounted(() => {
      getNotesList();
    });
    return {
      model: ref(""),
      createNote,
      date: ref("2023-04-04T02:46:03.387Z"),
      formDialog,
      handelCreateDialog,
      isEdit,
      getNotesList,
      handelUpdateNote,
      isPending,
      confirmCreateNote,
      confirmUpdateNote,
      notesList,
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
</style>
