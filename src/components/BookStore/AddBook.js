import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid'
import Database from "../../database/BookList";


class AddBook extends Component {

    state = {
        id: uuidv4(),
        name: "",
        price: 0.00,
        category: "classics",
        description: "",
        err: false,
    }

    baseState = this.state;


    changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    AddNewBook = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })

        if (this.state.name === "" || this.state.price === "" || this.state.description === "") {
            this.setState({ err: true })
        } else {
            this.setState({ err: false })
            Database.data.push({
                name: this.state.name,
                price: this.state.price,
                category: this.state.category,
                description: this.state.description
            })
            this.setState(this.baseState);
            this.props.refresh();
        }
    }

    cancelHandler = () => {
        this.setState(this.baseState);
        this.props.refresh();
    }

    render() {
        const { name, price, category, description, err } = this.state;
        const { isAdd } = this.props;
        if (!isAdd) {
            return false
        }
        return (
            <>
                <form className="form__popup">
                    {(err) ? (<p className="err">** All the fields are required</p>) : ""}
                    <fieldset className="form__view">
                        <legend className="form__title">Add New Book</legend>
                        <input
                            className="form__control"
                            placeholder="Name"
                            type="text"
                            name="name"
                            value={name || ""}
                            onChange={this.changeHandler}
                        />
                        <input
                            className="form__control"
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={price || ""}
                            onChange={this.changeHandler}
                        />
                        <select
                            className="form__control"
                            type="text"
                            name="category"
                            value={category || ""}
                            onChange={this.changeHandler} >
                            <option value="classics">classics</option>
                            <option value="horror">horror</option>
                            <option value="comic">comic</option>
                            <option value="programming">programming</option>
                            <option value="fantacy">fantacy</option>
                            <option value="historical ">historical</option>
                        </select>
                        <textarea
                            className="form__control form__textarea"
                            placeholder="Talk more about this book"
                            type="text"
                            name="description"
                            value={description || ""}
                            onChange={this.changeHandler}
                        />

                        <button className="btn__info" type="submit" onClick={this.AddNewBook}>Add Book</button>
                        <button className="btn__warning" type="reset" onClick={this.cancelHandler}>Cancel</button>
                    </fieldset>

                </form>
            </>
        )
    }
}

export default AddBook;