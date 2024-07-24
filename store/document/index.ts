import { defineStore } from 'pinia';
import { documents } from '../../assets/data';

export const useDoc = defineStore('document', {
  state: (): any => ({
    items: [],
    total: 0,
    limit: 50,
    page: 1,
    loading: false,
    error: false,
    message: '',
  }),
  actions: {},
});
