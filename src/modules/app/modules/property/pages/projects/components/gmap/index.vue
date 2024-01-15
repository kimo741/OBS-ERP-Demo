<template>
  <div id="app">
    <input type="text" v-model="location" placeholder="Enter a location" />
    <button @click="searchLocation">Search</button>
    <Map :lat="lat" :lon="lon" />
  </div>
</template>

<script>
import { ref } from "vue";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Map,
  },
  setup() {
    const location = ref("");
    const lat = ref(null);
    const lon = ref(null);

    const searchLocation = () => {
      // Search for the entered location using the Geocoding API
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location.value }, (results, status) => {
        if (status === "OK") {
          // Get the latitude and longitude coordinates of the first result
          lat.value = results[0].geometry.location.lat();
          lon.value = results[0].geometry.location.lng();
        }
      });
    };

    return {
      location,
      lat,
      lon,
      searchLocation,
    };
  },
};
</script>
