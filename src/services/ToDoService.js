import { toast } from "react-toastify";
import configuration from "../configuration/Configuration";
import axios from "axios";

export default class ToDoService {
  authData() {
    return {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
  }

  async addNewToDo(data) {
    const authData = this.authData();
    await axios
      .post(configuration.addNewToDo, data, authData)
      .then(() => {
        toast.success("ToDo was added succesfuly");
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  }

  async deleteToDo(id) {
    let authData = this.authData();

    await axios
      .delete(configuration.deleteToDo + id, authData)
      .then(() => {
        toast.success("ToDo was deleted succesfuly");
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  }

  async doneToDo(id) {
    let authData = this.authData();

    await axios
      .put(configuration.doneToDo + id, {}, authData)
      .then(() => {
        toast.success("ToDo was done succesfuly");
      })
      .catch((err) => {
        console.log("error", err.status);

        toast.error("Failed: " + err.name);
      });
  }

  async archiveToDo(id) {
    let authData = this.authData();

    await axios
      .put(configuration.archivateToDo + id, {}, authData)
      .then(() => {
        toast.success("ToDo was archived succesfuly");
      })
      .catch((err) => {
        toast.error("Failed: " + err.message);
      });
  }

  loadUsersToDoes() {
    let res;
    const authData = this.authData();

    const login = localStorage.getItem("login");
    if (login === null) {
      return;
    }

    fetch("http://localhost:5290/api/User/LoadToDoes/" + login)
      .then((resp) => console.log(resp.json()))
      .then((resp) => (res = resp.filter((t) => t !== null)))
      .catch((err) => toast.error(err.message));

    console.log("res", res);

    return res;
  }
}
