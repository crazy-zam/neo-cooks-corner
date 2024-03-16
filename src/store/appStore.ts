import { makeAutoObservable } from 'mobx';

class appStore {
  page: 'main' | 'search' | 'profile' = 'main';
  constructor() {
    makeAutoObservable(this);
  }
  setPage = (page: 'main' | 'search' | 'profile') => {
    this.page = page;
  };
}

export default new appStore();
