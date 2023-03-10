import React from "react";
import AddLocationBox from "./AddLocationBox";
import { getProductDetail, updateProduct } from "../apis/products.api";
import { getAvailableCategories } from "../apis/categories.api";
import { getAvailableMeasurements } from "../apis/measurements.api";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCategories: [],
      availableMeasurements: [],
      itemDetails: {
        measurementDetail:{
          unit: null
        },
        inventories: []
      },
      IsApiError: false,
      inventories: [],
      formData: {
        addLocationIds: [],
        removeInventoryIds: []
      }
    }
  }
  
  async componentDidMount() {
    await this.getAvailableCategories();
    await this.getAvailableMeasurements();
    await this.getProductDetail();
  }

  async getAvailableCategories() {
    try {
      let response = await getAvailableCategories();
      this.setState({
        availableCategories: response.data.data
      });
    } catch(err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  async getAvailableMeasurements() {
    try {
      let response = await getAvailableMeasurements();
      this.setState({
        availableMeasurements: response.data.data
      });
    } catch(err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  async getProductDetail() {
    try {
      let response = await getProductDetail(this.props.item.id);
      response.data.data.inventories.map((inventory) => {
        this.setState({
          inventories: [...this.state.inventories, {
            id: inventory.id,
            className:'text-black'
          }]
        })
      });
      this.setState({
        itemDetails: response.data.data,
      });
    } catch(err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  handleCloseButtonClicked() {
    this.props.closeModal(null, false, null);
  }

  handleCategoryChanged(event) {
    let category = this.state.availableCategories.find(c => c.name === event.target.value);
    if (category) {
      let formData = this.state.formData;
      formData.categoryId = category.id;
      this.setState({
        formData
      });
    }
  }

  handleTypeChanged(event) {
    let formData = this.state.formData;
    formData.type = event.target.value;
    this.setState({
      formData
    })
  }

  handleMeasurementChanged(event) {
    let measurement = this.state.availableMeasurements.find(m => m.unit === event.target.value);
    if (measurement) {
      let formData = this.state.formData;
      formData.measurementId = measurement.id;
      this.setState({
        formData
      });
    }
  }

  handleInventoryDeleteButtonClicked(index) {
    let inventories = this.state.inventories;
    let formData = this.state.formData;
    if (inventories[index].className == 'text-black') {
      inventories[index].className = 'text-red-600';
      formData.removeInventoryIds = [...this.state.formData.removeInventoryIds, inventories[index].id];
      this.setState({
        inventories,
        formData
      });
    }
    else if (inventories[index].className == 'text-red-600') {
      inventories[index].className = 'text-black';
      let removedIndex = this.state.formData.removeInventoryIds.findIndex(m => m.id == inventories[index].id);
      let removeInventoryIds = this.state.formData.removeInventoryIds;
      removeInventoryIds.splice(removedIndex, 1);
      formData.removeInventoryIds = removeInventoryIds;
      this.setState({
        inventories,
        formData
      });
    }
  }

  async handleSubmitButtonClicked() {
    try {
      let response = await updateProduct(this.props.item.id, this.state.formData);
      alert(response.data.message);
      this.props.getProducts(null);
    } catch (err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  addLocations(locationIds) {
    let formData = this.state.formData;
    formData.addLocationIds = locationIds;
    this.setState({
      formData
    });
  }

  render() {
    return (
      <React.Fragment>
        { 
          <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                Edit Product
              </h3>
              <button 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal"
                onClick={()=> { this.handleCloseButtonClicked() }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>  
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full text-base">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Category</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="categories" defaultValue={this.props.item.categoryDetail.name} onChange={this.handleCategoryChanged.bind(this)} />
                    <datalist id="categories">
                      {
                        this.state.availableCategories.map((category, index) => {
                          return (<option key={index} value={category.name}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Type</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={this.props.item.type} onChange={this.handleTypeChanged.bind(this)} />
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Brand</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" defaultValue={this.props.item.brand} onChange={this.handleTypeChanged.bind(this)} />
                  </div>
                  <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Measurement</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="measurements" defaultValue={this.state.itemDetails.measurementDetail.unit} onChange={this.handleMeasurementChanged.bind(this)} />
                    <datalist id="measurements">
                      {
                        this.state.availableMeasurements.map((measurement, index) => {
                          return (<option key={index} value={measurement.unit}></option>)
                        })
                      }
                    </datalist>
                  </div>
                </div>
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Locations</label>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th>Site</th>
                      <th>Building</th>
                      <th>Floor</th>
                      <th>Room</th>
                      <th>Rack</th>
                      <th>Rack Level</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.itemDetails.inventories.map((inventory, index) => {
                        return (
                          <tr key={index} className={"border-b dark:border-neutral-500 "+this.state.inventories[index].className}>
                            <td>{inventory.locationDetail.site}</td>
                            <td>{inventory.locationDetail.building}</td>
                            <td>{inventory.locationDetail.floor}</td>
                            <td>{inventory.locationDetail.room}</td>
                            <td>{inventory.locationDetail.rack}</td>
                            <td>{inventory.locationDetail.rackLevel}</td>
                            <td>
                              <button 
                                type="button" 
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={() => { this.handleInventoryDeleteButtonClicked(index) }}
                              >Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table><br />
                <AddLocationBox addLocations={this.addLocations.bind(this)} />
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
    )
  }
}

export default EditProduct;