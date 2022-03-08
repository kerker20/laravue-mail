import { ref, readonly } from "vue";

const scriptUrl = "//editor.unlayer.com/embed.js?2";


const isLoading = ref(false);

const isLoaded = ref(false);

const lastEditorId = ref(0);

let embedScript = null;

export const useUnlayer = () => ({
  isLoaded: readonly(isLoaded),
  isLoading: readonly(isLoading),
  lastEditorId: readonly(lastEditorId),

  getNextEditorId: () => `unlayer_${++lastEditorId.value}`
});

export function loadScript() {
  // return promise
  return new Promise((resolve) => {
    // jika sudah loaded, maka just return
    if (isLoaded.value) {
      resolve(unlayer);
    } else if (isLoading.value) {
      embedScript.addEventListener("load", () => {
        resolve(unlayer);
      });
    } else {
      isLoading.value = true;
      // load script and wait for loaded
      embedScript = document.createElement("script");
      embedScript.setAttribute("src", scriptUrl);
      embedScript.addEventListener("load", () => {
        isLoaded.value = true;
        isLoading.value = false;
        resolve();
      });
      document.head.appendChild(embedScript);
    }
  });
}