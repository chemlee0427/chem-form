<template>
  <span>
    <el-upload
      list-type="picture-card"
      :file-list="localValue"
      :on-success="handleSuccess"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="缩略图" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" v-show="canPreview(file)" @click="handlePreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" v-show="!Provider.scheme.onlyRead" @click="handleDelete(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="FLAG_PREVIEW" width="500px">
      <img width="100%" :src="previewUrl" alt="图片预览" />
    </el-dialog>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { Upload, Dialog } from 'element-ui';

// 已上传文件展示格式
interface Iuploadfile {
  name: string;
  url: string;
}

@Component({
  name: 'x-form-upload',
  components: { [Upload.name]: Upload, [Dialog.name]: Dialog }
})
export default class extends Vue {
  @Prop() value!: string | Iuploadfile[];
  @Inject() Provider!: Record<string, any>;

  localValue: Iuploadfile[] = [];

  @Watch('value', { immediate: true, deep: true })
  listenPropValueChange(newValue: string | Iuploadfile[]) {
    if (newValue instanceof Array) {
      this.localValue = newValue;
    } else {
      this.localValue = newValue
        ? newValue.split(',').map((v: string, id: number) => ({ name: `${id + 1}`, url: v }))
        : [];
    }
  }

  @Watch('localValue', { deep: true })
  emitUpdate(newValue: Iuploadfile[]) {
    const emitData = this.value instanceof Array ? newValue : newValue.map(item => item.url).join();
    this.$emit('input', emitData);
    this.$emit('update:value', emitData);
  }

  private handleSuccess(_, file: Iuploadfile) {
    this.localValue.push({ name: `${this.localValue.length + 1}`, url: file.url });
  }

  private handleDelete(file: Iuploadfile) {
    const targetIndex = this.localValue.findIndex(item => item.url === file.url);
    this.localValue.splice(targetIndex, 1);
  }

  // ---------- 图片预览 ----------
  FLAG_PREVIEW = false;
  previewUrl = '';

  // 能否预览 - 仅可预览图片格式
  canPreview(file: Iuploadfile) {
    const splitArr = file.url.split('.');
    const whiteListReg = /[jpg|jpeg|png|gif]/i;
    return whiteListReg.test(splitArr[splitArr.length - 1]);
  }

  private handlePreview(file: Iuploadfile) {
    this.previewUrl = file.url;
    this.FLAG_PREVIEW = true;
  }
}
</script>
