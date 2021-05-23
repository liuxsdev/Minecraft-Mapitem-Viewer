<template>
    <div class="mapdisplay">
        <div class="img">
            <div id="map_svg" />
            <div id="svg_hidden"></div>
        </div>
        <div class="operate">
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <div class="select">
                        <span>大小：</span>
                        <el-select v-model="map_size" placeholder="图像大小" @change="DrawForSave" style="width:160px">
                            <el-option
                                v-for="item in map_size_list"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="btn">
                        <el-button type="primary" plain @click="savePng">
                            <i class="el-icon-download"></i> 保存png
                        </el-button>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="btn">
                        <el-button type="primary" plain @click="saveSvg">
                            <i class="el-icon-download"></i> 保存svg
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import nbt from "nbt";
import mcmapcolors from "@liuxsdev/mc-map-colors";
import { SVG } from "@svgdotjs/svg.js";
import SvgSaver from "svgsaver";
//function
function get_color_id(data) {
    return data["value"]["data"]["value"]["colors"]["value"];
}

function get_RGB_data(color_id, colors) {
    if (color_id < 0) {
        //in nbt.js byteArray used byte is signed int8,cause color id become negative
        color_id = 256 + color_id;
    }
    let color = colors[color_id];
    if (color === undefined) {
        color = [0, 0, 0];
        console.log("error color id :", color_id);
    }
    return color;
}

function clearSvg(el) {
    let dom = document.querySelector(el);
    let svg = dom.querySelector("svg");
    if (svg) {
        svg.remove();
    }
}

function drawSVG(data, el, svg_width = 512, display_width = 512) {
    let scale = display_width / svg_width;
    let rect_width = svg_width / 128;
    let color_id_array = get_color_id(data);
    var count = 0;
    var draw = SVG()
        .addTo(el)
        .size(svg_width, svg_width);
    draw.transform({
        scale: scale
    });
    draw.css("transform-origin", "top");
    var pixel = draw.group();
    for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
            let color_id = color_id_array[count];
            let color = get_RGB_data(color_id, mcmapcolors);
            let color_str = `RGBA(${color[0]},${color[1]},${color[2]},${color[3]}`;
            pixel
                .rect(1 * rect_width, 1 * rect_width)
                .move(j * rect_width, i * rect_width)
                .fill(color_str);
            count += 1;
        }
    }
}

export default {
    name: "MapDisplay",
    props: {
        fileData: ArrayBuffer,
        fileName: String
    },
    data() {
        return {
            map_size_list: [
                {
                    value: 128,
                    label: "128x128"
                },
                {
                    value: 256,
                    label: "256x256"
                },
                {
                    value: 512,
                    label: "512x512"
                },
                {
                    value: 1024,
                    label: "1024x1024"
                }
            ],
            map_size: 128
        };
    },
    methods: {
        Draw: function() {
            var _this = this;
            clearSvg("#map_svg");
            nbt.parse(this.fileData, function(err, data) {
                drawSVG(data, "#map_svg", _this.map_size, 512);
            });
        },
        DrawForSave: function() {
            var _this = this;
            clearSvg("#svg_hidden");
            nbt.parse(this.fileData, function(err, data) {
                drawSVG(data, "#svg_hidden", _this.map_size, _this.map_size);
            });
        },
        savePng: function() {
            var svgs = new SvgSaver();
            svgs.asPng(
                "#svg_hidden svg",
                this.fileName.replace(".dat", ".png")
            );
        },
        saveSvg: function() {
            var svgs = new SvgSaver();
            svgs.asSvg(
                "#svg_hidden svg",
                this.fileName.replace(".dat", ".svg")
            );
        }
    },
    mounted: function() {
        this.Draw();
        this.DrawForSave();
    }
};
</script>

<style scoped>
div.mapdisplay {
    width: 512px;
    margin: 0 auto;
}

div.img {
    text-align: center;
}

div#map_svg {
    width: 512px;
    height: 512px;
    border: 1px solid #ccc;
}

div.btn {
    text-align: right;
}

div.operate {
    margin-top: 12px;
}

div#svg_hidden {
    display: none;
}
</style>