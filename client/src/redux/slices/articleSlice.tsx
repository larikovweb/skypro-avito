import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../../interface';

interface ArticleState {
  searchQuery: string;
  articles: IArticle[];
}

const initialState: ArticleState = {
  searchQuery: '',
  articles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setArticles(state, action: PayloadAction<IArticle[]>) {
      state.articles = action.payload;
    },
    resetSearch(state) {
      state.searchQuery = '';
    },
  },
});

export const { setSearchQuery, setArticles, resetSearch } = articleSlice.actions;
export default articleSlice.reducer;
