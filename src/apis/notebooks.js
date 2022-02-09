import request from "../helpers/request";
import { friendlyDate } from "../helpers/util";

const URL = {
  GET: "/notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:notebookId",
  DELETE: "/notebooks/:notebookId"
};
export default {
  getAll() {
    // return request(URL.GET);
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort((notebook1, notebook2) => {
            notebook1.createdAt > notebook2.createdAt ? 1 : -1;
          });
          res.data.forEach(notebook => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
          });
          resolve(res);
        })
        .catch(err => reject(err));
    });
  },
  updateNotebook(notebookId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":notebookId", notebookId), "PATCH", {
      title
    });
  },
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(":notebookId", notebookId), "DELETE");
  },
  addNotebook({ title = "" } = { title: "" }) {
    return request(URL.ADD, "POST", { title });
  }
};
