import { toolTipstyle, toolTipstyleCND } from "../components/styles";

export const renderToolTip = (props) => {
  if (props.active) {
    return (
      <div>
        {props.payload[0].payload["y"] < 0 ? (
          <div className="recharts-default-tooltip" style={toolTipstyle}>
            {`${props.payload[0].payload["z"].toFixed(3)}% to get ${
              props.payload[0].payload["x"]
            } or less blocks  `}
          </div>
        ) : props.payload[0].payload["y"] > 0 ? (
          <div className="recharts-default-tooltip" style={toolTipstyle}>
            {`${props.payload[0].payload["z"].toFixed(3)}% to get ${
              props.payload[0].payload["x"]
            } or more blocks  `}
          </div>
        ) : (
          <div className="recharts-default-tooltip" style={toolTipstyle}>
            {`${props.payload[0].payload["z"]}% to get ${props.payload[0].payload["x"]} blocks  `}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const renderToolTipCND = (props) => {
  if (props.active) {
    return (
      <div>
        <div style={toolTipstyleCND}>
          {` ${props.payload[0].payload["x"]} blocks`}
        </div>
        <div style={toolTipstyleCND}>
          {`z score: ${props.payload[0].payload["z"]}`}
        </div>
      </div>
    );
  }
  return null;
};
