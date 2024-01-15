<template>
  <q-card skeleton class="high-shadow full-width" bordered>
    <!-- <template #corner>
      <div class="row justify-around items-center">
        <q-skeleton class="col-1" type="rect" height="40px" />
        <q-skeleton class="col-2" type="rect" height="40px" />
        <q-skeleton class="col-1" type="rect" height="40px" />
        <q-skeleton class="col-2" type="rect" height="40px" />
        <q-skeleton class="col-2" type="rect" height="40px" />
        <q-skeleton class="col-1" type="rect" height="40px" />
        <q-skeleton class="col-1" type="rect" height="40px" />
      </div>
    </template> -->

    <q-markup-table v-if="$q.screen.gt.sm" flat>
      <!-- <thead>
        <tr>
          <th class="text-left" style="width: 200px">
            <q-skeleton height="50px" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton height="50px" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton height="50px" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton height="50px" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton height="50px" type="text" />
          </th>
          <th class="text-right">
            <q-skeleton height="50px" type="text" />
          </th>
        </tr>
      </thead> -->

      <tbody>
        <tr v-for="n in 10" :key="n">
          <td class="text-left">
            <q-skeleton type="text" width="85px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="50px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="35px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="65px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="25px" />
          </td>
          <td class="text-right">
            <q-skeleton type="text" width="85px" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- <div v-else class="full-width q-px-md">
      <q-list>
        <q-item v-for="col in 3" :key="col" class="q-px-none">
          <q-item-section>
            <q-skeleton type="text" width="70px" height="25px" />

            <q-skeleton type="text" width="90px" />
          </q-item-section>
        </q-item>
      </q-list>
    </div> -->
  </q-card>
</template>

<script>
export default {
  // props: {
  //   pendeng: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
};
</script>
