import React from "react";
import { addMeasurement } from "../apis/measurements.api";
import withRouter from "./withRouter";

class AddMeasurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCategories: [],
      availableMeasurements: [],
      IsApiError: false,
      formData: {}
    }
  }

  handleCloseButtonClicked() {
    const { navigate } = this.props;
    navigate('/')
  }

  handleUnitChanged(event) {
    let formData = this.state.formData;
    formData.unit = event.target.value;
    this.setState({
      formData
    })
  }

  handleDescriptionChanged(event) {
    let formData = this.state.formData;
    formData.description = event.target.value;
    this.setState({
      formData
    })
  }

  async handleSubmitButtonClicked() {
    try {
      let response = await addMeasurement(this.state.formData);
      alert(response.data.message);
    } catch (err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  render() {
    return (
      <React.Fragment>
        { 
          <div>
            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                Add Category
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full text-base">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">   
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Unit</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={this.handleUnitChanged.bind(this)} />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={this.handleDescriptionChanged.bind(this)} />
                  </div>
                </div>
              </form>
            </div>
            <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => { this.handleSubmitButtonClicked() }}
              >Submit
              </button>
              <button 
                type="button" 
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={()=> { this.handleCloseButtonClicked() }}
              >Cancel
              </button>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default withRouter(AddMeasurement);