<template>
    <div class="map">
        <el-upload
            ref="upload"
            class="upload"
            :disabled="uploadDisabled"
            drag
            action="#"
            :show-file-list="false"
            accept=".dat"
            :auto-upload="false"
            :on-change="onChange"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>
        <el-dialog
            :title="file_name"
            v-model="centerDialogVisible"
            width="30%"
            center
            :modal="false"
            @closed="closed"
            @opened="dialogOpen"
            :fullscreen="true"
            :destroy-on-close="true"
        >
            <MapDisplay :fileData="fileData" :fileName="file_name" />
        </el-dialog>
    </div>
</template>

<script>
import MapDisplay from "./MapDisplay";

// https://element-plus.gitee.io/#/zh-CN/component/upload
// https://blog.csdn.net/a736755244/article/details/99568133
export default {
    name: "MinecraftMap",
    components: {
        MapDisplay
    },
    data() {
        return {
            uploadDisabled: false,
            centerDialogVisible: false,
            fileData: "",
            file_name: ""
        };
    },
    methods: {
        onChange: function(file) {
            const file_name = file.name;
            const raw_data = file.raw;
            this.file_name = file_name;
            // const isDat =
            //     file_name.slice(file_name.length - 3, file_name.length) ===
            //     "dat";
            // console.log(isDat);
            this.handleFileDate(raw_data);
        },
        handleFileDate: function(file) {
            let _this = this;
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function() {
                // console.log(this.result);
                _this.uploadDisabled = true;
                _this.centerDialogVisible = true;
                _this.fileData = this.result;
            };
        },
        closed: function() {
            //Dialog 对话框关闭后，上传按钮可用
            this.uploadDisabled = false;
        },
        dialogOpen: function() {
            // console.log(this.fileData);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
