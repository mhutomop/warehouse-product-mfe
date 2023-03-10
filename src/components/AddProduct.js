import React from "react";
import { addProduct } from "../apis/products.api";
import { getAvailableCategories } from "../apis/categories.api";
import { getAvailableMeasurements } from "../apis/measurements.api";
import AddLocationBox from "./AddLocationBox";
import withRouter from "./withRouter";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCategories: [],
      availableMeasurements: [],
      IsApiError: false,
      formData: {
        locationIds: []
      }
    }
  }

  async componentDidMount() {
    await this.getAvailableCategories();
    await this.getAvailableMeasurements();
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

  handleCloseButtonClicked() {
    const { navigate } = this.props;
    navigate('/')
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

  handleBrandChanged(event) {
    let formData = this.state.formData;
    formData.brand = event.target.value;
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
      let response = await addProduct(this.state.formData);
      alert(response.data.message);
    } catch (err) {
      console.log(err);
      this.setState({ IsApiError: true });
      alert(err.response.data.message);
    }
  }

  addLocations(locationIds) {
    let formData = this.state.formData;
    formData.locationIds = locationIds;
    this.setState({
      formData
    });
  }

  render() {
    return (
      <React.Fragment>
        { 
          <div>
            <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                Add Product
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full text-base">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Category</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="categories" onChange={this.handleCategoryChanged.bind(this)} />
                    <datalist id="categories">
                      {
                        this.state.availableCategories.map((category, index) => {
                          return (<option key={index} value={category.name}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">   
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Type</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={this.handleTypeChanged.bind(this)} />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Brand</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={this.handleBrandChanged.bind(this)} />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Measurement</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="measurements" onChange={this.handleMeasurementChanged.bind(this)} />
                    <datalist id="measurements">
                      {
                        this.state.availableMeasurements.map((measurement, index) => {
                          return (<option key={index} value={measurement.unit}></option>)
                        })
                      }
                    </datalist>
                  </div>
                </div>
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
    );
  }
}

export default withRouter(AddProduct);