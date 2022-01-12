import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import BookList from "./components/BookList";
import './App.css';

function App(props) {
    const [items, setItems] = useState([]);

    const [pageCount, setpageCount] = useState(0);

    let limit = 10;
    const queryParams = new URLSearchParams(window.location.search);
    const author = queryParams.get('author');
    const search = queryParams.get('search');
    const category = queryParams.get('category');

    let url = "http://localhost:3000/book/";
    if (author != null) url += `author/${author}/`
    if (search != null) url += `search/${search}/`
    if (category != null) url += `category/${category}/`

    useEffect(() => {
        const getBooks = async () => {
            const res = await fetch(
                `${url}?_page=1&_limit=${limit}`
            );
            const result = await res.json();
            const data = result.books;

            const total = result.total;
            setpageCount(Math.ceil(total / limit));
            // console.log(Math.ceil(total/12));
            setItems(data);
        };

        getBooks();
    }, [limit]);

    const getBooks = async (currentPage = 1) => {
        const res = await fetch(
            `http://localhost:3000/book?_page=${currentPage}&_limit=${limit}`
        );
        const result = await res.json();
        const data = result.books;
        return data;
    };

    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const commentsFormServer = await getBooks(currentPage);

        setItems(commentsFormServer);
        window.scrollTo(0, 0)
    };
    return (
        <div className="container">

            <BookList data={items}></BookList>

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default App;