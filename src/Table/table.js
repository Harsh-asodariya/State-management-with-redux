import React, { Component } from 'react';
import FloatingInput from '../FloatingInput/floatingInput';
import { connect } from 'react-redux';
import * as actionTypes from '../Store/actionTypes';
import Modal from '../MODAL/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

class Table extends Component {

    submitDetailHandler = (id) => {
        let validity = this.validationHandler(this.props.singleData)
        if (validity) {
            this.props.submitDetailHandler(id)
        }
    }

    validationHandler = (data) => {
        if (data.name === '') {
            alert('Enter valid name')
            return false
        } else if (data.email === '' || !(/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/.test(data.email))) {
            alert('Enter valid email')
            return false
        } else if (data.phone === '' || !(/^([0-9]){10}$/.test(data.phone))) {
            alert('Enter valid phone')
            return false
        } else if (data.address === '') {
            alert('Enter valid address')
            return false
        } else if (data.website === '' || !(/^([a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/.test(data.website))) {
            alert('Enter valid website')
            return false
        } else {
            return true
        }
    }

    render() {
        let table;
        // if (this.props.data.length > 0) {
        table = <div className='table-responsive mx-5'>
            <table className="table table-sm table-success table-striped">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Website</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        this.props.data.map((data, index) => (
                            <tr key={data.id} id={data.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.address}</td>
                                <td>{data.phone}</td>
                                <td>{data.website}</td>
                                <td>
                                    <button type="button" className="btn btn-warning me-3" id={'edit' + data.id} onClick={() => this.props.editEventHandler(data.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button type="button" className="btn btn-danger ms-3" id={'delete' + data.id} onClick={() => this.props.deleteEventHandler(data.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
        // }


        return (
            <React.Fragment>
                <Modal open={this.props.slider}>
                    <div className='pt-5 m-5' style={{ position: 'static' }}>
                        <FloatingInput type='name' id='name' placeholder='Name' for='name' label='Name' value={this.props.singleData.name} changed={this.props.onChangeHandler} />
                        <FloatingInput type='email' id='email' placeholder='Email' for='email' label='Email' value={this.props.singleData.email} changed={this.props.onChangeHandler} />
                        <FloatingInput type='address' id='address' placeholder='Address' for='address' label='Address' value={this.props.singleData.address} changed={this.props.onChangeHandler} />
                        <FloatingInput type='phone' id='phone' placeholder='Phone' for='phone' label='Phone' value={this.props.singleData.phone} changed={this.props.onChangeHandler} />
                        <FloatingInput type='website' id='website' placeholder='Website' for='website' label='Website' value={this.props.singleData.website} changed={this.props.onChangeHandler} />
                        <button type="button" className="btn btn-danger mt-5 me-5" onClick={() => this.props.drawerCloseHandler()}>Cancel</button>
                        <button type="button" className="btn btn-primary mt-5" onClick={() => this.submitDetailHandler(this.props.singleData.id)}>Save</button>
                    </div>
                </Modal>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-primary mt-5 mb-3 mx-5" onClick={this.props.addDetailHandler}>Add Details</button>
                </div>
                {table}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singleData: state.reducer.singleData,
        data: state.reducer.data,
        slider: state.reducer.slider
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        drawerCloseHandler: () => dispatch({ type: actionTypes.DRAWER_CLOSE }),
        addDetailHandler: () => dispatch({ type: actionTypes.ADD_DETAIL_HANDLER }),
        onChangeHandler: (event) => dispatch({ type: actionTypes.ONCHANGE_HANDLER, event }),
        submitDetailHandler: (id) => dispatch({ type: actionTypes.SUBMIT_DETAIL_HANDLER, id }),
        deleteEventHandler: (id) => dispatch({ type: actionTypes.DELETE_EVENT_HANDLER, id }),
        editEventHandler: (id) => dispatch({ type: actionTypes.EDIT_EVENT_HANDLER, id })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Table)