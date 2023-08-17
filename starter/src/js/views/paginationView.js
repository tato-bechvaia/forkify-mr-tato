import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e){
           const btn = e.target.closest('.btn--inline');
           if(!btn) return ``;
           const goToPage = +btn.dataset.goto;
           handler(goToPage);
        });
    };
    
    _generateMarkup() {
        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // Page 1 and there are other pages
        if(this._data.page === 1 && numPages > 1){
            return `
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `
        };

        // Page 1 and there ar no other pages
        if(numPages === 1){
            return ``;
        };

        // Last Page
        if(this._data.page === numPages && numPages > 1){
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span> Page ${currPage - 1}</span>
            </button>
            `;
        };

        // Other Page (Middle Page)
        if(this._data.page > 1 && this._data.page < numPages){
            return `
            <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
            </button>
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        };
    }
}

export default new PaginationView();