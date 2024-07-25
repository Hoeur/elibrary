<template>
  <div
    data-aos="fade-down"
    class="breadcrumbs w-[90%] m-auto text-sky-400 bg-slate-50 text-md mb-2"
  >
    <ul class="w-[100%] m-auto">
      <li>
        <NuxtLink href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="24"
            fill="#00B3F0"
          >
            <path
              d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"
            />
          </svg>
          ទំព័រដើម
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :href="'/result?type=all'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="24"
            fill="#00B3F0"
          >
            <path
              d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"
            />
          </svg>
          ឯកសារ
        </NuxtLink>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="24"
            fill="#00B3F0"
          >
            <path
              d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
            />
          </svg>
          លម្អិត
        </a>
      </li>
    </ul>
  </div>
</template>
