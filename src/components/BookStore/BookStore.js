import React, { Component } from "react";
import AddBook from "./AddBook";
import Database from "../../database/BookList";
import EditBook from "./EditBook";
import "./bookstore.css";

class BookStore extends Component {

    state = {
        booklist: [],
        isAdd: null,
        isEdit: null,
        filteredId: null,
    }

    getDatabase = () => {
        this.setState({
            booklist: Database.data,
            isAdd: false,
            isEdit: false,
            filteredId: "",
        })
    }

    addToBookList = () => {
        this.setState({
            isAdd: true
        })
    }

    editToBookList = (itemId) => {
        this.setState({
            isEdit: true,
            filteredId: itemId
        })
    }

    deleteFromBookList = (delItem) => {
        Database.data.splice(delItem, 1);
        this.getDatabase();
    }

    componentDidMount() {
        this.getDatabase();
    }


    render() {
        const { booklist, isAdd, isEdit, filteredId } = this.state;
        return (
            <div className="container">
                <header className="header block">
                    <h1 className="header__title">Welcome To Our Book Store</h1>
                </header>
                <main className="main">
                    <section className="btn btn--sideR">
                        <button className="btn__add" onClick={this.addToBookList}>+</button>
                        <AddBook isAdd={isAdd} refresh={this.getDatabase} />
                    </section>
                    <section className="bookList block">
                        <ul className="table table--label">
                            <li className="table__head">Name</li>
                            <li className="table__head">Price</li>
                            <li className="table__head">Category</li>
                            <li className="table__head">Operation</li>
                        </ul>
                        {booklist.map((item, index) => {
                            return (
                                <ul className="table" key={index}>
                                    <li className="table__list">
                                        <button className="btn__link" onClick={() => this.editToBookList(item.id)}>{item.name}</button>
                                    </li>
                                    <li className="table__list">{"$" + item.price}</li>
                                    <li className="table__list">{item.category}</li>
                                    <li className="table__list">
                                        <button className="btn__delete" onClick={() => this.deleteFromBookList(index)}>DELETE</button>
                                    </li>
                                </ul>
                            )
                        })}
                        {
                            (filteredId !== null && filteredId !== "") ? (
                                <EditBook isEdit={isEdit} database={booklist.find(findItem => findItem.id === filteredId)} refresh={this.getDatabase} />
                            ) : ("")
                        }

                    </section>
                </main>
            </div>
        )
    }

}

export default BookStore;