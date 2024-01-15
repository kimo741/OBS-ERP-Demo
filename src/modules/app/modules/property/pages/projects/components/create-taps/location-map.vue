<template>
  <div style="height: 500px">
    <div class="search-box">
      <input type="text" v-model="searchQuery" placeholder="Search location" />
      <!-- <q-btn @click="searchLocation">Search</q-btn> -->
    </div>
    <div class="lockups">
      <div
        class="lockup"
        v-for="(lockup, index) in lockups"
        :key="index"
        @click="selectLockup(lockup)"
      >
        {{ lockup.display_name }}
      </div>
    </div>
    <!-- @click="addMarker" -->
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :fadeAnimation="true"
      :use-global-leaflet="false"
    >
      <!-- :bounds="bounds" -->
      <l-tile-layer :url="tileLayerUrl"></l-tile-layer>
      <l-marker
        @move="changeCenter"
        :lat-lng="location"
        :draggable="true"
      ></l-marker>
    </l-map>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
import { unitForm } from "./unit-taps/unit-form";
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";
import { latLng, latLngBounds } from "leaflet";
// import { form_data } from "../../composables/reaquist.js";
export default {
  name: "LocationPicker",
  components: { LMap, LTileLayer, LMarker },
  props: {
    lat: {
      type: Number || String,
      default: 25.6242618,
    },
    long: {
      type: Number || String,
      default: 42.3528328,
    },
  },

  setup(prop, { emit }) {
    const myMap = ref("");
    const zoom = ref(8);
    const center = ref([0, 0]);
    const tileLayerUrl = ref(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    const searchQuery = ref("");
    // const location = ref([form_data.value.latitude, form_data.value.longitude]);
    const location = computed({
      get() {
        return [prop.lat, prop.long];
      },
      set(value) {
        // console.log(value);
        emit("updateLatLon", { lat: value[1], long: value[0] });
      },
    });
    const lockups = ref([]);
    const bounds = ref(null);

    const searchLocation = () => {
      // Use an API to search for the location based on the search query
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery.value}&format=json`
        )
        .then((response) => {
          if (response.data.length > 0) {
            location.value = [response.data[0].lat, response.data[0].lon];
            center.value = [response.data[0].lat, response.data[0].lon];
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while searching for the location.");
        });
    };

    const searchLockups = () => {
      // Use an API to search for lockups based on the search query
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery.value}&format=json&addressdetails=1`
        )
        .then((response) => {
          lockups.value = response.data;
          if (lockups.value.length > 0) {
            const latLngs = lockups.value.map((lockup) =>
              latLng(lockup.lat, lockup.lon)
            );
            bounds.value = latLngBounds(latLngs);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while searching for the lockups.");
        });
    };

    const selectLockup = (lockup) => {
      location.value = [lockup.lat, lockup.lon];
      // form_data.value.latitude = lockup.lat;
      // form_data.value.longitude = lockup.lon;
      center.value = [lockup.lat, lockup.lon];
      // center.value = [lockup.lat, lockup.lon];
      // console.log(lockup);
      // bounds.value = latLngBounds(lockup.boundingbox);
    };

    const changeCenter = (val) => {
      myMap.value.setView([val.latlng.lat, val.latlng.lng], 8);
      let url = `https://www.google.com/maps/?q=${val.latlng.lat},${val.latlng.lng}`;
      emit("emitLocation", url);
    };

    // const addMarker = (event) => {
    //   console.log(event.latlng);
    //   emit("updateLatLon", { lat: event.latlng.lat, long: event.latlng.lng });
    // };
    onBeforeMount(() => {
      center.value = [prop.lat, prop.long];
    });
    return {
      zoom,
      center,
      tileLayerUrl,
      searchQuery,
      myMap,
      // addMarker,
      changeCenter,
      location,
      lockups,
      bounds,
      searchLocation,
      searchLockups,
      selectLockup,
      // centerUpdated,
      // boundsUpdated,
    };
  },
  watch: {
    searchQuery() {
      this.searchLockups();
    },
  },
};
</script>

<style>
.search-box {
  margin-bottom: 10px;
}
.lockups {
  display: flex;
  flex-wrap: wrap;
}
.lockup {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #e2e2e2;
  border-radius: 5px;
  cursor: pointer;
}
</style>
