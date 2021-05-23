<template>
    <MinecraftMap />
</template>

<script>
import MinecraftMap from "./components/MinecraftMap.vue";

export default {
    name: "App",
    components: {
        MinecraftMap
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
