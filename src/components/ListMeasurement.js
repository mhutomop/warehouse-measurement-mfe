import React from "react";
import SearchBar from "./SearchBar";
import RowMeasurement from "./RowMeasurement";
import Modal from "./Modal";
import { getMeasurements } from "../apis/measurements.api";
import withRouter from "./withRouter";

class ListMeasurement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: [],
      requiredItem: null,
      showModal: false,
      requiredForm: null,
      IsApiError: false
    }
  }

  componentDidMount() {
    this.getMeasurements(null);
  }

  async getMeasurements(unit) {
    try {
      let response = await getMeasurements(unit);
      if (response.data.success) {
        this.setState({
          measurements: response.data.data
        });
      }
    } catch(err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  replaceModalItem(item, show, form) {
    this.setState({
      requiredItem: item,
      showModal: show,
      requiredForm: form
    });
  }
  
  handleAddButtonClicked() {
    const { navigate } = this.props;
    navigate('/add')
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-10 text-3xl mx-auto max-w-6xl">
          <div className="flex justify-center">
            <SearchBar getMeasurements={this.getMeasurements.bind(this)} />
            <button 
              type="button" 
              className="ml-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={this.handleAddButtonClicked.bind(this)}
            >Add
            </button>
          </div>
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">No</th>
                <th scope="col" className="px-6 py-4">Unit</th>
                <th scope="col" className="px-6 py-4">Description</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.measurements.map((measurement, index) => {
                  return <RowMeasurement key={index} index={index} measurement={measurement} replaceModalItem={this.replaceModalItem.bind(this)} />
                })
              }
            </tbody>
          </table>
          <Modal show={this.state.showModal} item={this.state.requiredItem} form={this.state.requiredForm} replaceModalItem={this.replaceModalItem.bind(this)} getMeasurements={this.getMeasurements.bind(this)} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ListMeasurement);