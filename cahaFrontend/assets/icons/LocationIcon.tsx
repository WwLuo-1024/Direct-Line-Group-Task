import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function LocationIcon({ width = 24, height = 24 }) {
  return (
    <Svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
      <G
        stroke="#00852C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M12 21c3.5-3.6 7-6.824 7-10.8C19 6.224 15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8z" />
        <Path d="M12 13a3 3 0 100-6 3 3 0 000 6z" />
      </G>
    </Svg>
  );
}

export default LocationIcon;
