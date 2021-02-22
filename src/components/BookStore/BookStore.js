import React, { Component } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../Theme/Theme";
import AddBook from "./AddBook";
import Database from "../../database/BookList";
import EditBook from "./EditBook";
import "./bookstore.css";

class BookStore extends Component {

    static contextType = ThemeContext;

    state = {
        booklist: [],
        isAdd: null,
        isEdit: null,
        filteredId: null,
        checked: false,
        mode: "light"
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

    handleChange = (checked) => {
        if (checked === true) {
            this.setState({ checked, mode: "dark" })
        } else {
            this.setState({ checked, mode: "light" })
        }
    }

    componentDidMount() {
        this.getDatabase();
    }


    render() {
        const { booklist, isAdd, isEdit, filteredId, mode } = this.state;
        const newTheme = this.context.theme[mode];
        return (
            <div className="container" style={newTheme}>
                <header className={`header block${(mode === "light") ? "" : "--dark"}`}>
                    <h1 className="header__title">Welcome To Our Book Store</h1>
                    <div className="header__mode">
                        <h3 className="header__mode--title">Dark Mode:</h3>
                        <Switch onChange={this.handleChange} checked={this.state.checked} />
                    </div>
                </header>
                <main className="main">
                    <section className="btn btn--sideR">
                        <button className="btn__add" onClick={this.addToBookList}>+</button>
                        <AddBook isAdd={isAdd} refresh={this.getDatabase} />
                    </section>
                    <section className={`bookList block${(mode === "light") ? "" : "--dark"}`}>
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