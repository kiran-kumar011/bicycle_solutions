import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import { wrapper } from "~/utils/createStore";

import { getMqFromUA, getMqFromNavigator } from "~/utils/getDevice";
import {
  configActions
} from "~/reducers/actions";
import themeVars from "~/styles/variables";


class MyApp extends App {
  state = {
    deviceWidth: "900"
  };
  static async getInitialProps({ Component, ctx }) {

    let pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    if (ctx.req && ctx.req.headers["user-agent"]) {
      pageProps = {
        ...pageProps,
        ...getMqFromUA(ctx.req.headers["user-agent"])
      };
      ctx.store.dispatch(
        configActions.setConfig(getMqFromUA(ctx.req.headers["user-agent"]))
      );
    }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.onResize);
  }

  onResize = () => {
    try {
      this.setState(getMqFromNavigator());
      // this.props.store.dispatch(configActions.setConfig(getMqFromNavigator()));
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {
      Component,
      pageProps = {
        mq: "desktop",
        deviceHeight: "600",
        deviceWidth: "900",
        orientation: "landscape"
      },
      store
    } = this.props;
    const { mq, deviceHeight, orientation } = pageProps;
    const { deviceWidth } = this.state;
    const theme = {
      ...themeVars,
      mq,
      deviceWidth,
      deviceHeight,
      orientation,
      ...this.state
    };

    return (
        // <Provider store={store}>
          <ThemeProvider theme={theme}>
          <Component {...pageProps} {...this.state} />
          </ThemeProvider>
        //  </Provider>
    );
  }
}

export default wrapper.withRedux(MyApp);

