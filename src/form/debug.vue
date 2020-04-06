<template>
  <table>
    <tr>
      <td>字段名</td>
      <td v-for="prop in propArray" :key="prop">{{prop}}</td>
    </tr>
    <tr>
      <td>字段值</td>
      <td v-for="prop in propArray" :key="prop">{{tableSource[prop]}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({
  name: "x-form-debug"
})
export default class extends Vue {
  @Prop({ type: Object, default: () => ({}) }) tableSource!: Record<string, any>

  get propArray() {
    return Object.keys(this.tableSource)
  }
}
</script>

<style lang="scss" scoped>
table,
td,
th,
tr {
  border: 1px solid #343434;
  font-size: 13px;
  color: #3c9ddb;
  min-width: 48px;
  text-align: center;
}
table {
  border-collapse: collapse;
  margin-bottom: 10px;
  background-color: #1e1e1e;
  border-radius: 2px;
  overflow: hidden;
}

tr:nth-child(1) td {
  padding: 2px 10px;
}
tr:nth-child(2) td {
  padding: 5px 10px;
}

</style>