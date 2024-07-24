<script setup lang="ts">
/**
  Data
*/
import type { Document, MetaData } from '~/base/interfaces/ApiData';
import Loading from './components/loading.vue';
import Breadcrumb from './components/breadcrumb.vue';
import Sidebar from './components/sidebar/sidebar.vue';
import Content from './components/contents/content.vue';
import Pdf from './components/pdf/index.vue';
const route = useRoute();
const fragment = '#';
const message = ref<string | any>('');
const is_new_document = ref<boolean>(true);
const display_type = ref<boolean>(true);
const pdf_url = ref<any>(null);
const pdf_loading = ref<boolean>(false);
//================= end ================//

/***
 * @params ID
 * event : get document detail
 */
const { data, status, error, pending } = await useFetch<any>(
  '/api/document/' + route.params.id
);
if (error.value) {
  throw (message.value = error.value);
}
const item = ref<Document>((data as any)?.value.data);
const heading = ref(JSON.parse((data as any)?.value.data.heading));
//========

/** 
  handle change display type
*/
const handleChangeType = async () => {
  pdf_loading.value = true;
  const { data, error, pending } = await useFetch<any>(
    '/api/view/' + route.params.id
  );
  if (error.value) {
    throw (message.value = error.value);
  }

  pdf_url.value = `data:application/pdf;base64,` + (data as any).value;
  pdf_loading.value = pending.value;
  return (display_type.value = !display_type.value);
};

/**apply document style */
const applyStyle = (cssText: any): any => {
  const styleTag = document?.createElement('style');
  styleTag.textContent = cssText += `span{line-height:normal}`;
  document?.head?.appendChild(styleTag);
};

/**
 * @param event : sidebar checkbox
 */
const parentChange = (item: any, selected: any, id: any, type: any): any => {
  const content: any = document.getElementById(id);
  console.log(content);
  if (selected) {
    content.classList.remove('__hide-content');
  } else {
    content.classList.add('__hide-content');
  }
  for (let child of item.children) {
    let content: any = document.getElementById(child.value);
    if (selected) {
      content.classList.remove('__hide-content');
    } else {
      content.classList.add('__hide-content');
    }
    child.state.selected = selected;
    if (child.children.length > 0) {
      for (let subChild of child.children) {
        let content: any = document.getElementById(subChild.value);
        if (selected) {
          content.classList.remove('__hide-content');
        } else {
          content.classList.add('__hide-content');
        }
        subChild.state.selected = selected;
      }
    }
  }
};

/**
 *
 * @param toggle folder sidebar list
 */
const toggleFolder = (folder: any): any => {
  folder.state.opened = !folder.state.opened;
};

/**
 * 
 * @param id event open download modal
 */
const toggleDownload = (id:number) => {
  const downloadModal = document.getElementById(
    'download_modal'+id
  ) as HTMLDialogElement | null;
  downloadModal && downloadModal.showModal();
};
/**
 *document apply style render
 **/
onMounted(() => {
  watchEffect(() => applyStyle(item?.value.css));
});
</script>
<template>
  <NuxtLoadingIndicator />
  <button
    class="btn btn-primary bg-[#1608d4] !rounded-full !w-14 !h-14 fixed bottom-[5rem] right-[20px] z-[99999] __print"
    @click="toggleDownload(item.id)"
  >
    <font-awesome-icon icon="download" class="text-xl text-slate-200" />
  </button>
  <!-- loading skeleton -->
  <template v-if="pending || pdf_loading">
    <Loading />
  </template>
  <!-- end -->

  <!-- document content -->
  <template v-else-if="!pending && item.content && display_type">
    <!-- breadcrumb -->
    <Breadcrumb />
    <!-- sidebar and document content -->
    <div
      class="flex-row md:flex overscroll-contain overflow-Y-auto h-auto item-start justify-center"
    >
      <!-- sidebar -->
      <Sidebar
        :heading="heading"
        :handleChangeType="handleChangeType"
        :pending="pending"
        :toggleFolder="toggleFolder"
        :parentChange="parentChange"
        :item="item"
      />

      <!-- document html  -->
      <div
        data-aos="zoom-in"
        class="__wrapper_content col-span-7"
        style="zoom: 100%"
      >
        <Content :content="item.content" />
      </div>
    </div>
  </template>

  <!-- pdf display -->
  <template v-else-if="!display_type">
    <div
      v-if="pdf_loading"
      class="fixed inset-0 flex items-center justify-center"
    >
      <span class="loading loading-dots loading-lg"></span>
    </div>
    <Pdf v-else :handleChangeType="handleChangeType" :url="pdf_url" />
  </template>
  <DocumentDownload :id="item.id" :title="item.name" />
</template>
<style>
@media print {
  .__sub_title {
    display: none !important;
  }
}

@page {
  size: A4;
  margin: 25.4mm;
  /* 1 inch = 25.4 mm */
}

.__wrapper_content {
  width: 24cm;
  padding: 0 1cm 1cm 1cm;
}

.__bg_content {
  overflow-x: auto;
  width: 20cm;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 2cm;
  page-break-after: always;
}

.__content img,
video {
  margin: auto !important;
  object-fit: contain;
}

table {
  border: 1px;
  border-style: solid;
}

ul ol li {
  list-style-type: disc;
}

/* sidebar style */

.tab {
  --tab-color: #000000 !important;
  --tab-bg: #00b3f0 !important;
  --tab-border-color: #00b3f0 !important;
}

.tab:focus {
  --tab-color: #ffffff !important;
  --tab-bg: #00b3f0 !important;
  --tab-border-color: #00b3f0 !important;
}

.__sidebar-heading {
  /* background: red; */
  display: flex;
  align-items: flex-start;
}

.__sidebar-heading .checkbox {
  margin-top: 0px !important;
}

.__sidebar-heading input {
  margin-top: 10px;
}

.__hide-content {
  visibility: hidden;
  display: none;
  background-color: red;
}

.dd {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
  /* max-width: 600px; */
  list-style: none;
  line-height: 20px;
}

.dd-list {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dd-list {
  padding-left: 10px;
}

.dd-item {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  min-height: 20px;
  line-height: 20px;
}

.dd-handle {
  display: block;
  margin: 7px 0;
  /* padding: 10px 10px; */
  display: flex;
  align-items: center;
  /* text-decoration: none; */
}

.folder-tree-wrapper {
}

.folder-tree {
  list-style: none;
  cursor: pointer;
  padding-left: 10px;
}

.folder-tree li {
  margin-bottom: 10px;
  font-size: 14px;
  transition: all 0.4s ease;
  position: relative;
  margin-left: 0px;
}

.folder-tree li:hover {
}

.folder-tree li i {
  color: rgb(242, 176, 53);
}

.folder-tree li ul {
  padding-left: 10px;
  padding-top: 8px;
}

/* .folder-tree ul {
  display: none;
  position: relative;
} */

.folder-tree li ul li:before {
  position: absolute;
  content: '';
  left: -10px;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: transparent;
  border-left: solid 1px #c2c2c2;
  border-bottom: solid 1px #c2c2c2;
}

.folder-tree li ul li {
  display: block;
  padding: 5px 0;
  margin: 0;
}

/* .folder-tree .arrow {
  position: absolute;
  top: 40px;
  left: -21px;
  width: 10px;
  height: 10px;
  transition: all .4s ease;
  transform: rotate(-90deg);
} */

.folder-tree .arrow i {
  color: #595959;
  transition: all 0.4s ease;
}

.folder-tree .arrow:hover i {
  color: #292929;
}

.folder-tree li.expanded > ul {
  display: block;
}

.folder-tree li.expanded > .arrow {
  transform: rotate(0deg);
}

/*  */
</style>
