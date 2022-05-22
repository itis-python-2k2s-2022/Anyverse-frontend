import ReactDOM from "react-dom";
import {render} from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import App from './App'


ReactDOM.render(<App />, document.getElementById("root"));
// render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// export const getDefaultProfile = ( nickname: string ): string => {
//   return `/default_profile/get_profile_info/${nickname}`;
// };
//

