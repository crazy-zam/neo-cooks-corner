import { useState } from 'react';
import Grid from '../../components/Grid/Grid';
import styles from './search.module.less';
import { AddBtn, Loupe, SearchClear } from '@/assets';
import ModalContainer from '@/components/ModalContainer/ModalContainer';
import FormAddRecipe from '@/components/FormAddRecipe/FormAddRecipe';
import { observer } from 'mobx-react-lite';
import searchStore from '@/store/searchStore';
import Loader from '@/UI/Loader/Loader';
import PageBtnGroup from '@/UI/PageBtnGroup/PageBtnGroup';
import { useDebounce } from '@/hooks/useDebounce';
import useColumnsGrid from '@/hooks/useGridColumnsRecipes';

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
  const debounceSearch = useDebounce((search: string) => {
    if (search === '') return;
    searchStore.getResults(search);
  });
  const searchHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.target.value);
    debounceSearch(ev.target.value);
  };
  const columnsRecipes = useColumnsGrid(searchStore.limit, 280);
  const columnsChefs = useColumnsGrid(searchStore.limit, 200);
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
          onChange={searchHandler}
        ></input>
        {search === '' ? (
          <Loupe className={styles.searchInner} />
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
          <Loader />
        ) : (
          <>
            {searchStore.results.length !== 0 && (
              <>
                <Grid
                  array={searchStore.results}
                  type={searchStore.category}
                  columns={
                    searchStore.category === 'chefs'
                      ? columnsChefs
                      : columnsRecipes
                  }
                />
                <PageBtnGroup store={searchStore} />
              </>
            )}
          </>
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
        closeModalBtn={true}
      >
        <FormAddRecipe closeModal={closeModal} />
      </ModalContainer>
    </div>
  );
});

export default Search;
