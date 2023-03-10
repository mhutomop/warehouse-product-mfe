import React from "react";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.setState({
        show: this.props.show
      });
    }
  }

  closeModal() {
    this.setState({
      show: false
    });
    this.props.replaceModalItem(null, false, null);
  }

  render() {
    return (
      <React.Fragment>
        { 
          this.state.show ? (
            <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center">
              <div className="overflow-x-hidden overflow-y-auto">
                <div className="relative w-full px-4 h-full md:h-auto">
                  { 
                    this.props.form == 'edit' ?
                      <EditProduct item={this.props.item} closeModal={this.closeModal.bind(this)} getProducts={this.props.getProducts} />
                    : <DeleteProduct item={this.props.item} closeModal={this.closeModal.bind(this)} getProducts={this.props.getProducts} />
                  }
                </div>
              </div>
            </div>
          ) : null
        }
      </React.Fragment>
    )
  }
}

export default Modal;