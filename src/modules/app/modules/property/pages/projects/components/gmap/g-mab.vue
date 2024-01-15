<template>
  <div id="map"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

export default {
  name: "Map",
  props: ["lat", "lon"],
  setup(props) {
    const map = ref(null);
    const marker = ref(null);

    onMounted(() => {
      const loader = new Loader({
        apiKey: "YOUR_API_KEY",
        version: "weekly",
      });

      loader.load().then(() => {
        // Create a new Google Map instance
        map.value = new google.maps.Map(document.getElementById("map"), {
          center: { lat: props.lat, lng: props.lon },
          zoom: 13,
        });

        // Add a marker to the map at the specified location
        if (props.lat && props.lon) {
          marker.value = new google.maps.Marker({
            position: { lat: props.lat, lng: props.lon },
            map: map.value,
          });
        }
      });
    });

    return {
      map,
      marker,
    };
  },
};
</script>

<style>
#map {
  height: 400px;
}
</style>
