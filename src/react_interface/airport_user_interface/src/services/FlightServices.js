import axios from "axios"

const FLIGHT_API_BASE_URL = "http://localhost:8090/api/v1/flights/";

class FlightServices {

    getDepartureFlight() {
        return axios.get(FLIGHT_API_BASE_URL + "departure-flight");
    }

    getArrivalFlight() {
        return axios.get(FLIGHT_API_BASE_URL + "arrival-flight")
    }

    insertNewFlight(flight) {
        return axios.post(FLIGHT_API_BASE_URL + "insert-new-flight", flight)
    }

    getFlightById(flightId) {
        return axios.get(FLIGHT_API_BASE_URL + flightId)
    }

    updateFlight(newFlight, flightId) {
        return axios.put(FLIGHT_API_BASE_URL + flightId, newFlight)
    }

    deleteFlight(flightId) {
        return axios.delete(FLIGHT_API_BASE_URL + flightId);
    }

}


export default new FlightServices()