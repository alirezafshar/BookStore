import React, { Component } from "react";
import Database from "../../database/BookList";

class EditBook extends Component {

    state = {
        id: this.props.database.id,
        name: this.props.database.name,
        price: this.props.database.price,
        category: this.props.database.category,
        description: this.props.database.description,
        err: false
    }

    changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    editHandler = (e) => {
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
            Database.data.forEach(item => {
                if (item.id === this.state.id) {
                    item.name = this.state.name;
                    item.price = this.state.price;
                    item.category = this.state.category;
                    item.description = this.state.description;
                }
            })
            this.props.refresh();
        }
    }

    render() {
        const { name, price, category, description, err } = this.state;
        const { isEdit, refresh } = this.props;
        if (!isEdit) {
            return false;
        }
        return (
            <>
                <form className="form__popup">
                    {(err) ? (<p className="err">** All the fields are required</p>) : ""}
                    <fieldset className="form__view">
                        <legend className="form__title">Edit Selected Book</legend>
                        <input
                            className="form__control"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name || ""}
                            onChange={this.changeHandler} />
                        <input
                            className="form__control"
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={price || ""}
                            onChange={this.changeHandler} />
                        <select
                            className="form__control"
                            type="text"
                            name="category"
                            value={category || ""}
                            onChange={this.changeHandler}>
                            <option value="classics">classics</option>
                            <option value="horror">horror</option>
                            <option value="comic">comic</option>
                            <option value="programming">programming</option>
                            <option value="fantacy">fantacy</option>
                            <option value="historical ">historical</option>
                        </select>
                        <textarea
                            className="form__control form__textarea"
                            type="text"
                            placeholder="Talk more about this book"
                            name="description"
                            value={description || ""}
                            onChange={this.changeHandler} />

                        <button className="btn__info" type="submit" onClick={this.editHandler}>Edit</button>
                        <button className="btn__warning" type="button" onClick={refresh}>Cancel</button>
                    </fieldset>
                </form>
            </>
        )
    }

}

export default EditBook;