import { getDateFormat } from '../../services/index';
<script setup lang="ts">
import { getDateFormat } from '../../services/index';
const props: any = defineProps<{
  heading: any[];
  handleChangeType: () => any;
  pending: boolean;
  toggleFolder: () => any;
  parentChange: () => any;
  item: any;
}>();
const fragment = ref<any>('#');
</script>

<template>
  <div
    class="no-print w-[98vw] min-h-screen m-auto lg:m-0 lg:w-[350px] lg:mr-5 lg:sticky top-2 text-black shadow-md overflow-hidden overflow-y-auto h-auto lg:h-screen max-h-full mt-2 border border-t-0 border-slate-400 bg-[rgb(248,249,250)]"
  >
    <div
      data-aos="fade-right"
      role="tablist"
      v-auto-animate
      class="tabs tabs-bordered bg-white grid md:grid-flow-col grid-cols-2 w-full m-auto"
    >
      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        class="tab flex-wrap !text-lg [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
        aria-label="
                មាតិកា"
        checked
        @click="props.handleChangeType"
        v-auto-animate
      />
      <div role="tabpanel" class="tab-content active w-full p-2 pt-4">
        <div class="folder-tree-wrapper">
          <div v-if="props.pending && props.heading"></div>
          <ul v-else class="folder-tree" ref="folderTree">
            <li v-for="(h1, index) in props.heading" :key="index">
              <div class="flex items-center flex-nowrap">
                <input
                  type="checkbox"
                  class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                  :name="h1.text"
                  :checked="h1.state.selected"
                  @click="h1.state.selected = !h1.state.selected"
                  v-on:change="
                    props.parentChange(
                      h1,
                      h1.state.selected,
                      h1.value,
                      h1.heading
                    )
                  "
                />
                <div class="text-nowrap w-full pl-1">
                  <a
                    :href="h1.href"
                    class="text-md link !text-[#1608d4] text-wrap hover:font-bold ml-2"
                    :class="fragment === h1.href ? 'link-info' : ''"
                    >{{ h1.text }}</a
                  >
                </div>
                <div v-show="h1.children?.length > 0" class="arrow px-1">
                  <font-awesome-icon
                    :icon="['fas', 'angle-right']"
                    class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                    :class="
                      h1.state.opened == false ? 'rotate-90' : 'rotate-180'
                    "
                    @click="props.toggleFolder(h1)"
                  />
                </div>
              </div>
              <ul
                class="ml-2"
                v-show="h1.state.opened == false && h1.children.length > 0"
              >
                <li v-for="(h2, h2Index) in h1?.children" :key="h2Index">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                      :name="h2.text"
                      :checked="h2.state.selected"
                      @click="h2.state.selected = !h2.state.selected"
                      v-on:change="
                        props.parentChange(
                          h2,
                          h2.state.selected,
                          h2.value,
                          h2.heading
                        )
                      "
                    />
                    <div class="pl-1">
                      <a
                        :href="h2.href"
                        class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2"
                        >{{ h2.text }}</a
                      >
                    </div>
                    <div v-show="h2.children.length > 0" class="arrow px-1">
                      <font-awesome-icon
                        :icon="['fas', 'angle-right']"
                        class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                        :class="
                          h2.state.opened == false ? 'rotate-90' : 'rotate-180'
                        "
                        @click="props.toggleFolder(h2)"
                      />
                    </div>
                  </div>
                  <ul
                    class="ml-2"
                    v-show="h2.state.opened == false && h2.children.length > 0"
                  >
                    <li v-for="(h3, h3Index) in h2?.children" :key="h3Index">
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                          :name="h3.text"
                          :checked="h3.state.selected"
                          @click="h3.state.selected = !h3.state.selected"
                          v-on:change="
                            props.parentChange(
                              h3,
                              h3.state.selected,
                              h3.value,
                              h3.heading
                            )
                          "
                        />
                        <div class="pl-1">
                          <a
                            :href="h3.href"
                            class="text-md link !text-[#1608d4] hover:font-bold text-wrap ml-2"
                            >{{ h3.text }}</a
                          >
                        </div>
                        <div v-show="h3.children.length > 0" class="arrow px-1">
                          <font-awesome-icon
                            :icon="['fas', 'angle-right']"
                            class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                            :class="
                              h3.state.opened == false
                                ? 'rotate-90'
                                : 'rotate-180'
                            "
                            @click="props.toggleFolder(h3)"
                          />
                        </div>
                      </div>
                      <ul
                        class="ml-2"
                        v-show="
                          h3.state.opened == false && h3.children.length > 0
                        "
                      >
                        <!-- h4 -->
                        <li v-for="(h4, h4Index) in h3.children" :key="h4Index">
                          <div class="flex items-center">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                              :name="h4.text"
                              :checked="h4.state.selected"
                              @click="h4.state.selected = !h4.state.selected"
                              v-on:change="
                                props.parentChange(
                                  h4,
                                  h4.state.selected,
                                  h4.value,
                                  h4.heading
                                )
                              "
                            />
                            <div class="pl-1">
                              <a
                                :href="h4.href"
                                class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2"
                                >{{ h4.text }}</a
                              >
                            </div>
                            <div
                              v-show="h4.children.length > 0"
                              class="arrow px-1"
                            >
                              <font-awesome-icon
                                :icon="['fas', 'angle-right']"
                                class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                                :class="
                                  h4.state.opened == false
                                    ? 'rotate-90'
                                    : 'rotate-180'
                                "
                                @click="props.toggleFolder(h4)"
                              />
                            </div>
                          </div>
                          <ul
                            class="ml-2"
                            v-show="
                              h4.state.opened == false && h4.children.length > 0
                            "
                          >
                            <!-- h5 -->
                            <li
                              v-for="(h5, h5Index) in h4.children"
                              :key="h5Index"
                            >
                              <div class="flex items-center">
                                <input
                                  type="checkbox"
                                  class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                  :name="h5.text"
                                  :checked="h5.state.selected"
                                  @click="
                                    h5.state.selected = !h5.state.selected
                                  "
                                  v-on:change="
                                    props.parentChange(
                                      h5,
                                      h5.state.selected,
                                      h5.value,
                                      h5.heading
                                    )
                                  "
                                />
                                <div class="pl-1">
                                  <a
                                    :href="h5.href"
                                    class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2"
                                    >{{ h5.text }}</a
                                  >
                                </div>
                                <div
                                  v-show="h5.children.length > 0"
                                  class="arrow px-1"
                                >
                                  <font-awesome-icon
                                    :icon="['fas', 'angle-right']"
                                    class="transform transition-transform duration-500 text-2xl text-[#1608d4]"
                                    :class="
                                      h5.state.opened == false
                                        ? 'rotate-90'
                                        : 'rotate-180'
                                    "
                                    @click="props.toggleFolder(h5)"
                                  />
                                </div>
                              </div>
                              <ul
                                class="ml-2"
                                v-show="
                                  h5.state.opened == false &&
                                  h5.children.length > 0
                                "
                              >
                                <!-- h6 -->
                                <li
                                  v-for="(h6, h6Index) in h5.children"
                                  :key="h6Index"
                                >
                                  <div class="flex items-center">
                                    <input
                                      type="checkbox"
                                      class="checkbox checkbox-info !rounded-none ![--chkbg:white] ![--chkfg:#1608d4] !border-[#1608d4]"
                                      :name="h6.text"
                                      :checked="h6.state.selected"
                                      @click="
                                        h6.state.selected = !h6.state.selected
                                      "
                                      v-on:change="
                                        props.parentChange(
                                          h6,
                                          h6.state.selected,
                                          h6.value,
                                          h6.heading
                                        )
                                      "
                                    />
                                    <div class="pl-1">
                                      <a
                                        :href="h6.href"
                                        class="text-md link text-[#1608d4] hover:font-bold text-wrap ml-2"
                                        >{{ h6.text }}</a
                                      >
                                    </div>
                                    <!-- If there are more levels of headings, continue nesting here -->
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        class="tab text-slate-800 !text-lg [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
        aria-label="លម្អិត"
        v-auto-animate
      />
      <div role="tabpanel" class="tab-content pt-4 __details p-2">
        <div class="text-lg">
          <div class="mt-2 font-bold text-sky-500">ចំណងជើង :</div>
          <div class="mt-2 text-slate-700">
            {{ props.item.name }}
          </div>
          <div class="mt-2 font-bold text-sky-500">
            កាលបរិច្ឆេទប្រកាសឲ្យប្រើ :
          </div>
          <span class="text-slate-700">
            {{ getDateFormat(props.item) }}
          </span>
          <div class="mt-2 font-bold text-sky-500">កាលបរិច្ឆេទបង្ហោះ :</div>
          <span class="text-slate-700">
            {{
              props.item.date
                ? formatDateToKhmer(props.item.date || 123456789)
                : ''
            }}
          </span>
        </div>
      </div>
      <input
        type="radio"
        name="my_tabs_3"
        role="tab"
        class="tab text-slate-800 !text-lg [--tab-bg:#1608d4] [--tab-border-color:#1608d4] !rounded-tl-none !rounded-tr-none"
        aria-label="មើលជាទម្រង់PDF"
        v-auto-animate
        @click="props.handleChangeType"
      />
      <div role="tabpanel" class="tab-content pt-4 __details p-2"></div>
    </div>
  </div>
</template>

<style scoped></style>