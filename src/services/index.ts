import { authServiceFirebase } from "./firebase/authServiceFirebase";
import { eventServiceFirebase } from "./firebase/eventServiceFirebase";
import { productServiceFirebase } from "./firebase/productServiceFirebase";
import { recipeServiceFirebase } from "./firebase/recipeServiceFireabse";
import { shoppingServiceFirebase } from "./firebase/shoppingServiceFirebase";
import { eventServiceMock } from "./mock/eventServiceMock";
import { productServiceMock } from "./mock/productServiceMock";
import { recipeServiceMock } from "./mock/recipeServiceMock";
import { shoppingServiceMock } from "./mock/shoppingServiceMock";
import { taskServiceMock } from "./mock/taskServiceMock";

const MODE = import.meta.env.VITE_DATA_MODE || "mock";
const DEV = "test";

export const authService =
  MODE === "firebase"
    ? authServiceFirebase
    : DEV === "test"
      ? authServiceFirebase
      : authServiceFirebase;

export const productService =
  MODE === "firebase" ? productServiceFirebase : productServiceMock;

export const recipeService =
  MODE === "firebase" ? recipeServiceFirebase : recipeServiceMock;

export const shoppingService =
  MODE === "firebase" ? shoppingServiceFirebase : shoppingServiceMock;

export const eventService =
  MODE === "firebase"
    ? eventServiceFirebase
    : DEV === "test"
      ? eventServiceFirebase
      : eventServiceMock;

export const taskService =
  MODE === "firebase" ? taskServiceMock : taskServiceMock;
