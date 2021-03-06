import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import Page from "../components/Page";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    //crawl pages and fetch data to work with server-side rendering
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    //exposes query to user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
