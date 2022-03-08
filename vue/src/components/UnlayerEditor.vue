<script setup>
import { onMounted } from "vue";
import { loadScript, useUnlayer } from "../script-loader";
const { isLoaded, isLoading, getNextEditorId } = useUnlayer();

const editorId = getNextEditorId();
let editor = null;

onMounted(async () => {
  await loadScript();
  // create new editor
  const opt = {
    id: editorId,
  };
  editor = unlayer.createEditor(opt);
});
</script>

<template>
  <div v-if="isLoading">
    <span>Loading...</span>
  </div>
  <div v-else :id="editorId"></div>
</template>

<style>
div[id^="unlayer_"] {
  height: 100%;
}
</style>