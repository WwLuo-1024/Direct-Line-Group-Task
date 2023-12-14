/**
 * @author Luo Wang
 * Router Index
 */
import MapScreen from "./MapScreen";
import AddLocationScreen from "./AddLocationScreen";

type AppRouterType = {
  name: string;
  component: React.FC;
  headerShown: boolean;
  initialParams?: Object;
};

export type RootStackParamList = {
  AddLocationScreen: {
    id?: number;
    title?: string;
    description?: string;
    latitude: string;
    longitude: string;
    markerColor?: string;
  };
};

const appRouter: AppRouterType[] = [
  {
    name: "MapScreen",
    component: MapScreen,
    headerShown: false,
    initialParams: {
      latitude: null,
      longitude: null,
    },
  },
  {
    name: "AddLocationScreen",
    component: AddLocationScreen,
    headerShown: false,
    initialParams: {
      latitude: null,
      longitude: null,
    },
  },
];

export default appRouter;
