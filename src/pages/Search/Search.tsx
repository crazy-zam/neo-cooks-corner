import { useState } from 'react';
import Grid from '../../components/Grid/Grid';
import { dishes } from '../../api/dishes';
import styles from './search.module.less';
import { AddBtn, CloseModal, Loupe, SearchClear } from '@/assets';
import ModalContainer from '@/components/ModalContainer/ModalContainer';
import FormAddRecipe from '@/components/FormAddRecipe/FormAddRecipe';
import { observer } from 'mobx-react-lite';
import searchStore from '@/store/searchStore';
const Search = observer(() => {
  const [search, setSearch] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const addBtn = (category: 'chefs' | 'recipes') => {
    return (
      <button
        className={
          searchStore.category === category
            ? styles.activeToggle
            : styles.passiveToggle
        }
        onClick={() => {
          setSearch('');
          searchStore.setCategory(category);
        }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    );
  };
  return (
    <div className={styles.wrapper}>
      <div>What to eat today?</div>
      <div className={styles.toggle}>
        {addBtn('chefs')}
        {addBtn('recipes')}
      </div>
      <div className={styles.searchWrapper}>
        <input
          placeholder="Search recipes"
          className={search !== '' ? styles.searchFilled : styles.searchEmpty}
          type="text"
          value={search}
          onChange={(ev) => {
            setSearch(ev.target.value);
          }}
        ></input>
        {search !== '' ? (
          <Loupe
            className={styles.searchInner}
            onClick={() => {
              searchStore.getResults(search);
            }}
          />
        ) : (
          <SearchClear
            className={styles.searchInner}
            onClick={() => {
              setSearch('');
            }}
          />
        )}
      </div>
      <div className={styles.gridWrapper}>
        <div>Search results</div>
        {searchStore.isLoading ? (
          <div>Loading..</div>
        ) : (
          <Grid array={searchStore.results} type={searchStore.category} />
        )}
      </div>
      <button className={styles.addBtn} onClick={openModal}>
        <AddBtn className={styles.addBtnIcon} />
        Add your recipe
      </button>
      <ModalContainer
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title="Create recipe"
      >
        <button className={styles.buttonCloseModal} onClick={closeModal}>
          <CloseModal />
        </button>
        <FormAddRecipe />
      </ModalContainer>
    </div>
  );
});

export default Search;
