// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Style from "../App.module.css";
// import axios from "axios";

// function ProfilePage() {
//   const navigate = useNavigate();
//   const [showUserInfo, setShowUserInfo] = useState(false);
//   const [loanStatus, setLoanStatus] = useState([]); // State to store loan status
//   const [errorMessage, setErrorMessage] = useState(""); // State to store error message

//   const logoutUser = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   const userFirstName = localStorage.getItem("userFirstName") || "John";
//   const userLastName = localStorage.getItem("userLastName") || "Doe";
//   const userEmailAddress =
//     localStorage.getItem("userEmailAddress") || "john.doe@example.com";

//   useEffect(() => {
//     async function getPersonalFinancialAdvice() {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/userFinancialAdvice",
//           { userEmailAddress }
//         );
//         setLoanStatus(response.data.loanStatus); // Set the loan status
//       } catch (error) {
//         console.error("Error getting data:", error);
//         setErrorMessage("Unable to fetch financial advice");
//       }
//     }
//     getPersonalFinancialAdvice();
//   }, [userEmailAddress]);

//   console.log(loanStatus);
  
//   return (
//     <div className={Style.mainDiv}>
//       <div className={Style.mainPageMainDiv}>
//         <div className={Style.navBarMainPage}>
//           <div className={Style.logoNavBarMainPage}>
//             <h1>FINEX</h1>
//           </div>

//           <div className={Style.linkNavBarMainPage}>
//                        <Link className={Style.linkElementNavBar} to="/mainPage">
//                          Home
//                        </Link>
//                        <Link className={Style.linkElementNavBar} to="/mainPage">
//                          Features
//                        </Link>
//                        <Link className={Style.linkElementNavBar} to="/mainPage">
//                        Contact Us
//                        </Link>
//                      </div>

//           <div className={Style.ProfileBtnNavBarMainPage}>
//             <Link className={Style.profileBtn} to="/profilePage">
//               Profile
//             </Link>

//             {showUserInfo && (
//               <div className={Style.userInfoDiv}>
//                 <p className={Style.userInfoDivPara1}>
//                   {`${userFirstName} ${userLastName}`}
//                 </p>
//                 <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
//                 <button className={Style.logoutBtn} onClick={logoutUser}>
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={Style.loanApprovalMainDiv}>
//           <div className={Style.loanApprovalMainDivInnerDiv}>
//             <div className={Style.profilePageInnerDiv1}>
//               <div className={Style.profilePageInnerDiv11}>
//                 <h1>
//                   {userFirstName} {userLastName}
//                 </h1>
//                 <p>{userEmailAddress}</p>
//               </div>

//               <div className={Style.profilePageInnerDiv12}>
//                 <button className={Style.logoutBtn} onClick={logoutUser}>
//                   Logout
//                 </button>
//               </div>
//             </div>
//             <div className={Style.profilePageInnerDiv2}>

//               {/* Show the users route details */}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "../App.module.css";
import axios from "axios";

function ProfilePage() {
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userRoutes, setUserRoutes] = useState([]); // State for route details
  const [errorMessage, setErrorMessage] = useState(""); // State for errors

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const userFirstName = localStorage.getItem("userFirstName") || "John";
  const userLastName = localStorage.getItem("userLastName") || "Doe";
  const userEmailAddress =
    localStorage.getItem("userEmailAddress") || "john.doe@example.com";

  useEffect(() => {
    async function fetchUserRoutes() {
      try {
        const response = await axios.post(
          "http://localhost:5000/fetchUserRoutes",
          { userEmailAddress }
        );
        setUserRoutes(response.data.routes); // Store routes in state
      } catch (error) {
        console.error("Error fetching user routes:", error);
        setErrorMessage("Unable to fetch route details.");
      }
    }
    fetchUserRoutes();
  }, [userEmailAddress]);

  return (
    <div className={Style.mainDiv}>
      <div className={Style.mainPageMainDiv}>
        {/* Navbar */}
        <div className={Style.navBarMainPage}>
          <div className={Style.logoNavBarMainPage}>
            <h1>FINEX</h1>
          </div>
          <div className={Style.linkNavBarMainPage}>
            <Link className={Style.linkElementNavBar} to="/mainPage">
              Home
            </Link>
            <Link className={Style.linkElementNavBar} to="/mainPage">
              Features
            </Link>
            <Link className={Style.linkElementNavBar} to="/mainPage">
              Contact Us
            </Link>
          </div>
          <div className={Style.ProfileBtnNavBarMainPage}>
            <Link className={Style.profileBtn} to="/profilePage">
              Profile
            </Link>
            {showUserInfo && (
              <div className={Style.userInfoDiv}>
                <p className={Style.userInfoDivPara1}>
                  {`${userFirstName} ${userLastName}`}
                </p>
                <p className={Style.userInfoDivPara2}>{userEmailAddress}</p>
                <button className={Style.logoutBtn} onClick={logoutUser}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Page */}
        <div className={Style.loanApprovalMainDiv}>
          <div className={Style.loanApprovalMainDivInnerDiv}>
            <div className={Style.profilePageInnerDiv1}>
              <div className={Style.profilePageInnerDiv11}>
                <h1>
                  {userFirstName} {userLastName}
                </h1>
                <p>{userEmailAddress}</p>
              </div>
              <div className={Style.profilePageInnerDiv12}>
                <button className={Style.logoutBtn} onClick={logoutUser}>
                  Logout
                </button>
              </div>
            </div>

            {/* Route Details Section */}
            <div className={Style.profilePageInnerDiv2}>
              <h2>Your Saved Routes</h2>
              {errorMessage ? (
                <p className={Style.errorMessage}>{errorMessage}</p>
              ) : (
                <div className={Style.routesGrid}>
                  {userRoutes.map((route, index) => (
                    <div key={index} className={Style.routeCard}>
                      <h3>{route.routeType}</h3>
                      <p>
                        <strong>Route:</strong> {route.route}
                      </p>
                      <p>
                        <strong>Cost:</strong> ₹{route.cost}
                      </p>
                      <p>
                        <strong>Time:</strong> {route.time} hrs
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

