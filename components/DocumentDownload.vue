import { type } from '../.nuxt/types/imports';
<script setup lang="ts">
const props: any = defineProps({
  id: String,
  title: String,
});
const route = useRoute();
const message = ref<string | any>('');
const loading = ref<boolean>(false);

const handleDownload = async (type: 'word' | 'pdf') => {
  loading.value = true;
  try {
    let downloadUrl: string;

    switch (type) {
      case 'word':
        downloadUrl = '/api/download/docx/' + props.id;
        break;
      case 'pdf':
        downloadUrl = '/api/download/' + props.id;
        break;
      default:
        throw new Error('Unsupported file type');
    }

    const { data, error } = await useFetch<Blob>(downloadUrl, {
      method: 'GET',
    });

    if (error.value) {
      throw (message.value = error.value.message); // Store the error message
    } else if (data.value) {
      const url = URL.createObjectURL(data.value);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        type === 'word' ? `${props.title}.docx` : `${props.title}.pdf`; // Set file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    message.value = (err as Error).message; // Handle any unexpected errors
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <dialog :id="'download_modal' + props.id" class="modal">
    <div class="modal-box bg-zinc-50 rounded-sm">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost text-lg absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <div class="grid grid-cols-2">
        <div class="download_option_item" @click="handleDownload('pdf')">
          <img
            src="../assets/images/pdf.png"
            alt="PDF"
            class="block object-contain h-16 sm:h-20 w-auto"
          />
          <span class="text-sm sm:text-base">ទាញយកជាទម្រង់ PDF</span>
        </div>
        <div class="download_option_item" @click="handleDownload('word')">
          <img
            src="../assets/images/docx.png"
            alt="WORD"
            class="block object-contain h-16 sm:h-20 w-auto"
          />
          <span class="text-sm sm:text-base">ទាញយកជាទម្រង់ WORD</span>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
