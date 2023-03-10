import React from "react";
import { deleteProduct } from "../apis/products.api";

class DeleteProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCloseButtonClicked() {
    this.props.closeModal(null, false, null);
  }

  async handleSubmitButtonClicked() {
    try {
      let response = await deleteProduct(this.props.item.id);
      alert(response.data.message);
      this.props.getProducts(null);
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
          <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
          <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
              Delete Product
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
              <label>Are you sure to delete this product [{this.props.item.type}] ?</label>
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

export default DeleteProduct;