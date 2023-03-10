import React from "react";
import { getAvailableLocations } from "../apis/locations.api";

class AddLocationBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLocations: [],
      inputData: {},
      showAddLocationInput: false,
      IsApiError: false
    }
  }

  async componentDidMount() {
    await this.getAvailableLocations();
    let sites = [];
    this.state.availableLocations.map((location) => {
      if (!sites.includes(location.site)) {
        sites.push(location.site);
      }
    });
    this.setState({
      inputData: {
        availableSites: sites
      }
    });
  }

  async getAvailableLocations() {
    try {
      let response = await getAvailableLocations();
      if (response.data.success) {
        this.setState({
          availableLocations: response.data.data
        });
      }
    } catch(err) {
      console.log(err);
      this.setState({ IsApiError: true });
    }
  }

  handleAddButtonClicked() {
    let inputData = this.state.inputData;
    inputData.selectedSite = null;
    inputData.selectedBuilding = null;
    inputData.availableBuildings = [];
    inputData.selectedFloor = null;
    inputData.availableFloors = [];
    inputData.selectedRoom = null;
    inputData.availableRooms = [];
    inputData.selectedRack = null;
    inputData.availableRacks = [];
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = [];
    inputData.selectedId = null;
    this.setState({
      inputData,
      showAddLocationInput: true
    });
  }

  handleSiteChanged(event) {
    let buildings = [];
    this.state.availableLocations.map((location) => {
      if (location.site == event.target.value && !buildings.includes(location.building)) {
        buildings.push(location.building);
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedSite = event.target.value;
    inputData.selectedBuilding = null;
    inputData.availableBuildings = buildings;
    inputData.selectedFloor = null;
    inputData.availableFloors = [];
    inputData.selectedRoom = null;
    inputData.availableRooms = [];
    inputData.selectedRack = null;
    inputData.availableRacks = [];
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = [];
    inputData.selectedId = null;
    this.setState({
      inputData
    });
  }

  handleBuildingChanged(event) {
    let floors = [];
    this.state.availableLocations.map((location) => {
      if (location.site == this.state.inputData.selectedSite && 
        location.building == event.target.value &&
        !floors.includes(location.floor)) {
        floors.push(location.floor);
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedBuilding = event.target.value,
    inputData.selectedFloor = null;
    inputData.availableFloors = floors;
    inputData.selectedRoom = null;
    inputData.availableRooms = [];
    inputData.selectedRack = null;
    inputData.availableRacks = [];
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = [];
    inputData.selectedId = null;
    this.setState({
      inputData
    });
  }

  handleFloorChanged(event) {
    let rooms = [];
    this.state.availableLocations.map((location) => {
      if (location.site == this.state.inputData.selectedSite && 
        location.building == this.state.inputData.selectedBuilding &&
        location.floor == event.target.value &&
        !rooms.includes(location.room)) {
        rooms.push(location.room);
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedFloor = event.target.value;
    inputData.selectedRoom = null;
    inputData.availableRooms = rooms;
    inputData.selectedRack = null;
    inputData.availableRacks = [];
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = [];
    inputData.selectedId = null;
    this.setState({
      inputData
    });
  }

  handleRoomChanged(event) {
    let racks = [];
    this.state.availableLocations.map((location) => {
      if (location.site == this.state.inputData.selectedSite && 
        location.building == this.state.inputData.selectedBuilding &&
        location.floor == this.state.inputData.selectedFloor &&
        location.room == event.target.value &&
        !racks.includes(location.rack)) {
        racks.push(location.rack);
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedRoom = event.target.value;
    inputData.selectedRack = null;
    inputData.availableRacks = racks;
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = [];
    inputData.selectedId = null;
    this.setState({
      inputData
    });
  }

  handleRackChanged(event) {
    let rackLevels = [];
    this.state.availableLocations.map((location) => {
      if (location.site == this.state.inputData.selectedSite && 
        location.building == this.state.inputData.selectedBuilding &&
        location.floor == this.state.inputData.selectedFloor &&
        location.room == this.state.inputData.selectedRoom &&
        location.rack == event.target.value &&
        !rackLevels.includes(location.rackLevel)) {
        rackLevels.push(location.rackLevel);
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedRack = event.target.value;
    inputData.selectedRackLevel = null;
    inputData.availableRackLevels = rackLevels;
    inputData.selectedId = null;
    this.setState({
      inputData
    });
  }

  handleRackLevelChanged(event) {
    let id;
    this.state.availableLocations.map((location) => {
      if (location.site == this.state.inputData.selectedSite && 
        location.building == this.state.inputData.selectedBuilding &&
        location.floor == this.state.inputData.selectedFloor &&
        location.room == this.state.inputData.selectedRoom &&
        location.rack == this.state.inputData.selectedRack &&
        location.rackLevel == event.target.value) {
        id = location.id;
      }
    });
    let inputData = this.state.inputData;
    inputData.selectedId = id;
    this.setState({
      inputData
    });
  }

  handleSaveButtonClicked() {
    let location = this.state.availableLocations.find(l => l.id == this.state.inputData.selectedId);
    if (location) {
      this.setState({
        addLocations: [...this.state.addLocations, location],
        showAddLocationInput: false
      }, () => {
        this.props.addLocations(this.extractLocationIds(this.state.addLocations));
      });
    }
  }

  handleCancelButtonClicked() {
    this.setState({
      showAddLocationInput: false
    });
  }

  handleDeleteButtonClicked(index) {
    let addLocations = this.state.addLocations;
    let removedIndex = this.state.addLocations.findIndex(l => l.id == addLocations[index].id);
    addLocations.splice(removedIndex, 1);
    this.setState({
      addLocations
    }, () => {
      this.props.addLocations(this.extractLocationIds(this.state.addLocations));
    });
  }

  extractLocationIds(locations) {
    let locationIds = [];
    locations.map((location) => {
      locationIds.push(location.id);
    });
    return locationIds;
  }

  render() {
    return(
      <React.Fragment>
          {
            !this.state.showAddLocationInput ?
              (
                <button 
                  type="button" 
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={this.handleAddButtonClicked.bind(this)}
                >Add Location
                </button>
              ) : null
          }
        <br /><table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th>Site</th>
              <th>Building</th>
              <th>Floor</th>
              <th>Room</th>
              <th>Rack</th>
              <th>Rack Level</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.addLocations.map((location, index) => {
                return (
                  <tr key={index}>
                    <td>{location.site}</td>
                    <td>{location.building}</td>
                    <td>{location.floor}</td>
                    <td>{location.room}</td>
                    <td>{location.rack}</td>
                    <td>{location.rackLevel}</td>
                    <td>
                      <button 
                        type="button" 
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => { this.handleDeleteButtonClicked(index) }}
                      >Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            } 
          </tbody>
        </table><br />
        {
          this.state.showAddLocationInput ? 
            (
              <div className="w-full text-base">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Site</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="sites" onChange={this.handleSiteChanged.bind(this)} />
                    <datalist id="sites">
                      {
                        this.state.inputData.availableSites.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Building</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="buildings" onChange={this.handleBuildingChanged.bind(this)} />
                    <datalist id="buildings">
                      {
                        this.state.inputData.availableBuildings.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Floor</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="floors" onChange={this.handleFloorChanged.bind(this)} />
                    <datalist id="floors">
                      {
                        this.state.inputData.availableFloors.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Room</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="rooms" onChange={this.handleRoomChanged.bind(this)} />
                    <datalist id="rooms">
                      {
                        this.state.inputData.availableRooms.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Rack</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="racks" onChange={this.handleRackChanged.bind(this)} />
                    <datalist id="racks">
                      {
                        this.state.inputData.availableRacks.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">Rack Level</label>
                    <input className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="list" list="rackLevels" onChange={this.handleRackLevelChanged.bind(this)} />
                    <datalist id="rackLevels">
                      {
                        this.state.inputData.availableRackLevels.map((site, index) => {
                          return (<option key={index} value={site}></option>)
                        })
                      }
                    </datalist>
                  </div>
                </div>
                <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button 
                    type="button" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={this.handleSaveButtonClicked.bind(this)}
                  >Save
                  </button>
                  <button 
                    type="button" 
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    onClick={this.handleCancelButtonClicked.bind(this)}
                  >Cancel
                  </button>
                </div>
              </div>
            ) : null
        }
      </React.Fragment>
    )
  }
}

export default AddLocationBox;