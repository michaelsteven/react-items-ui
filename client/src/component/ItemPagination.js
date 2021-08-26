import React, {Component} from 'react';

class UserPagination extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.pageNumber,
            pageSize: props.pageSize,
            currentPage: props.offset,
            totalNumberOfElements: props.totalElements
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.buildPagination = this.buildPagination.bind(this);
    }

    onPageChange = (pageNumber) => {
        this.props.handleChangePage(pageNumber);
    };

    static getDerivedStateFromProps(props, state) {
        state = props;
        return state;
    }

    goToFirstPage() {
        this.onPageChange(0);
    }

    goToLastPage() {
        this.onPageChange(this.state.page.totalNumberOfPages - 1);
    }

    goToPreviousPage() {
        const previousPage = this.state.page.previousPageable;
        if (previousPage !== "INSTANCE") {
            this.onPageChange(previousPage.pageNumber);
        }
    }

    goToNextPage() {
        const {currentPage, page} = this.state;
        const nextPage = page.nextPageable;
        if (nextPage !== "INSTANCE") {
            this.onPageChange(currentPage + 1);
        }
    }

    buildPagination(page, currentPage) {
        //PAGINATION LOGIC
        //SEE LINK TO PASTEBIN.COM
    }

    render() {

        const {page, currentPage} = this.state;

        let pagination = this.buildPagination(page, currentPage);


        return (
            <ul className="pagination">
                {pagination}
            </ul>
        );
    }
}

export default UserPagination;