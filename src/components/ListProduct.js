import React from "react";
import SearchBar from "./SearchBar";
import RowProduct from "./RowProduct";
import Modal from "./Modal";
import { getProducts } from "../apis/products.api";
import withRouter from "./withRouter";

class ListProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      requiredItem: null,
      showModal: false,
      requiredForm: null,
      IsApiError: false
    }
  }

  componentDidMount() {
    this.getProducts(null);
  }

  async getProducts(type) {
    try {
      let response = await getProducts(type);
      if (response.data.success) {
        this.setState({
          products: response.data.data
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
            <SearchBar getProducts={this.getProducts.bind(this)} />
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
                <th scope="col" className="px-6 py-4">Category</th>
                <th scope="col" className="px-6 py-4">Type</th>
                <th scope="col" className="px-6 py-4">Brand</th>
                <th scope="col" className="px-6 py-4">Unit</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.products.map((product, index) => {
                  return <RowProduct key={index} index={index} product={product} replaceModalItem={this.replaceModalItem.bind(this)} />
                })
              }
            </tbody>
          </table>
          <Modal show={this.state.showModal} item={this.state.requiredItem} form={this.state.requiredForm} replaceModalItem={this.replaceModalItem.bind(this)} getProducts={this.getProducts.bind(this)} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ListProduct);