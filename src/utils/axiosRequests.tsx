import { GridRowModel } from "@mui/x-data-grid";
import Axios from "axios";

const URL = "http://18.188.61.139/navi";

export async function postNewUser(userName: string) {
  try {
    const response = await Axios.post(URL + "/users/new", {
      userName: userName,
    });
    console.log("Server:", response.data);
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function getAllUserNames() {
  try {
    const response = await Axios.get(URL + "/users/all");
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await Axios.post(URL + "/users/delete", {
      id: id,
    });
    console.log("Server:", response.data);
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function getAllTasksForUser(userId: string) {
  try {
    const response = await Axios.get(`${URL}/tasks/user?user=${userId}`);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}
export async function updateTask(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/tasks/update", row);
    console.log("Server:", response.data);
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function deleteTask(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/tasks/delete", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function swapTask(row: GridRowModel, direction: string) {
  try {
    const response = await Axios.post(
      URL + `/tasks/swap?direction=${direction}`,
      row,
    );
    // console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function addTask(row: GridRowModel) {
  try {
    const response = await Axios.post(URL + "/tasks/add", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function getAllMorningRoutinesForUser(userId: string) {
  try {
    const response = await Axios.get(
      `${URL}/morningroutines/user?user=${userId}`,
    );
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function addMorningRoutine(row: GridRowModel) {
  try {
    const response = await Axios.post(URL + "/morningroutines/add", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function updateMorningRoutine(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/morningroutines/update", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function deleteMorningRoutine(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/morningroutines/delete", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function swapMorningRoutine(row: GridRowModel, direction: string) {
  try {
    const response = await Axios.post(
      `${URL}/morningroutines/swap?direction=${direction}`,
      row,
    );
    // console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

//
// Chores
//

export async function getAllChoresForUser(userId: string, day: string) {
  try {
    const response = await Axios.get(
      `${URL}/chores/user?user=${userId}&day=${day}`,
    );
    console.log("DAY FROM REQUEST:", day);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function addChore(row: GridRowModel) {
  try {
    const response = await Axios.post(URL + "/chores/add", row);
    console.log("DAY FROM REQUEST:", row.day);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function updateChore(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/chores/update", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function deleteChore(row: GridRowModel) {
  console.log("Client: row: ", row);
  try {
    const response = await Axios.post(URL + "/chores/delete", row);
    console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}

export async function swapChore(row: GridRowModel, direction: string) {
  try {
    const response = await Axios.post(
      `${URL}/chores/swap?direction=${direction}`,
      row,
    );
    // console.log("Server:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}
