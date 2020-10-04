import { connect } from "react-redux";
import {
  MainContainer
} from "./styles";

const Main = ({
  children,
  deviceWidth,
}) => {

  return (
    <>
      <MainContainer>
                {children}
      </MainContainer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    deviceWidth: state.config.deviceWidth
  };
};

export default connect(mapStateToProps)(Main);
