import axios from "axios";

const AIRCRAFT_API_BASE_URL = "http://localhost:8090/api/v1/";

class AircraftServices {
    getAllAircraft() {
        return axios.get(AIRCRAFT_API_BASE_URL + "aircrafts");
    }

    getAircraftFlights(aircraftType){
        return axios.get(AIRCRAFT_API_BASE_URL+"aircraftsFlights?aircraftType="+aircraftType)
    }

    insertNewAircraft(aircraft) {
        return axios.post(AIRCRAFT_API_BASE_URL + "aircrafts/insert-new-aircraft", aircraft)
    }

    getFlightById(id) {
        return axios.get(AIRCRAFT_API_BASE_URL + "aircrafts/" + id)
    }

    updateAircraft(aircraft, id) {
        return axios.put(AIRCRAFT_API_BASE_URL + "aircrafts/" + id, aircraft)
    }

    deleteAircraft(id) {
        return axios.delete(AIRCRAFT_API_BASE_URL + "aircrafts/" + id)
    }


}

export default new AircraftServices();