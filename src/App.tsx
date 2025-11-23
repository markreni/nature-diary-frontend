import Home from "./pages/Home.tsx";
import { getObservations, createObservation } from "./services/requests.ts";
import AdditionForm from "./pages/AdditionForm.tsx";
import QuestionForm from "./pages/QuestionForm.tsx";
import Observations from "./pages/Observations.tsx";
import UnidentifiedObservations from "./pages/UnidentifiedObservations.tsx";
import Unidentified from "./pages/Unidentified.tsx";
import MyAccount from "./pages/MyAccount.tsx";
import NavBar from "./components/NavBar.tsx";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Routes,
  Route,
  //Link,
  //Navigate,
  //useParams,
  //useNavigate,
  useMatch,
} from "react-router-dom";
import type {
  IObservationSavedResponse,
  ObservationType,
} from "./types/types.ts";
//import Observation from './components/Observation.tsx'
import observations from "./observations.ts";
import SignUp from "./pages/SignUpForm.tsx";
import Login from "./pages/Login.tsx";

import ObservationPage from "./pages/ObservationPage.tsx";
import ObservationsMap from "./pages/ObservationsMap.tsx";
import observationService from "./services/observationService.ts";
import type { AxiosResponse } from "axios";

const App = () => {
  const queryClient = useQueryClient();
  const match = useMatch("/observations/:id");

  const newObservationMutation = useMutation<
    AxiosResponse<IObservationSavedResponse>, // returned data
    Error, // error type
    FormData // input type
  >({
    mutationFn: observationService.create, // this now accepts FormData
    onSuccess: (response) => {
      console.log("Observation saved with ID:", response.data.observationId);

      // Update cache with the saved observation from backend
      const currentObservations =
        queryClient.getQueryData<ObservationType[]>(["observations"]) || [];

      queryClient.setQueryData(
        ["observations"],
        [
          ...currentObservations,
          {
            id: response.data.observationId,
          },
        ]
      );
    },
    onError: (error) => {
      console.error("Error saving observation:", error);
    },
  });

  const addObservation = async (formData: FormData): Promise<IObservationSavedResponse> => {
    const token = localStorage.getItem("token");
    if (token) {
      observationService.setToken(token);
    }

    return new Promise((resolve, reject) => {
      newObservationMutation.mutate(formData, {
        onSuccess: (response) => resolve(response.data),
        onError: (error) => reject(error),
      });
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["observations"],
    queryFn: getObservations,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>nature diary is not available due to problems in server</div>;

  // filter identified and unidentified observations
  // identified observations are also filtered by public=true because only those are shown in the public catalogue
  // all unidentified observations are shown in the unidentified page
  // after identification the observation should be moved to public catalogue if public=true
  const identified = data!.filter(
    (obs) => obs.identified === true && obs.public === true
  );
  const unidentified = data!.filter((obs) => obs.identified === false);
  // get the observation for the single observation page if the url matches /observations/:id
  const publicObservations = data!.filter((obs) => obs.public === true);

 

  return (
    <ThemeProvider>
      <div>
        <NavBar />
        <div className="routes-margin">
          <Routes>
            <Route
              path="/observations/:id"
              element={<ObservationPage/>}
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/observations"
              element={<Observations />}
            />
            <Route
              path="/unidentified"
              element={<UnidentifiedObservations observations={unidentified} />}
            />
            <Route
              path="/map"
              element={<ObservationsMap observations={publicObservations} />}
            />
            <Route path="/questions" element={<QuestionForm />} />
            <Route
              path="/add"
              element={<AdditionForm addObservation={addObservation} />}
            />
            <Route
              path="/myaccount"
              element={<MyAccount observations={identified} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
