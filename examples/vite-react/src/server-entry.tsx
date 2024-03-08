import { renderToString } from "react-dom/server";
import App from "./App";

export const Index = () => {
  return renderToString(<App />);
};
