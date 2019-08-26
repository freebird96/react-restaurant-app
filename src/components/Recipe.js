import React, { Component } from 'react'

export default class Recipe extends Component {
    render() {

        const {
            image_url,
            publisher,
            title,
            source_url,
            recipe_id
        } = this.props.recipe;

        const {handleDetails} = this.props;

        return (
            <React.Fragment>
                <div className="col-01 mx-auto col-6-md col-ld-4 my-3">
                    <div className="card">
                        <img src={image_url} alt="pic" className="img-card-top"
                        style={{height: "14rem"}}/>
                        <div className="card-body text-capitalize">
                            <h6>{title}</h6>
                            <h6 className="text-warning text-slanted">Provided by {publisher}</h6>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary text-capitalize" onClick ={handleDetails} >details</button>
                            <a href={source_url} className="btn btn-warning text-capitalize mx-2"
                            target = "_blank"
                            rel="noopener noreferrer">recipe url</a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
