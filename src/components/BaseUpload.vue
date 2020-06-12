<template>
  <el-upload
    action="https://jsonplaceholder.typicode.com/posts/"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <i class="el-icon-plus"></i>
  </el-upload>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Upload } from 'element-ui';

@Component({
  name: 'x-form-upload',
  components: { [Upload.name]: Upload }
})
export default class extends Vue {}
</script>
