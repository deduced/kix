import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import { perPage } from "../config";
import PaginationStyles from "./styles/PaginationStyles";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      const count = data.itemsConnection.aggregate.count;
      const page = props.page;
      const pages = Math.ceil(count / perPage);
      if (loading) return <p>Loading...</p>;
      return (
        <PaginationStyles>
          <Head>
            <title>
              Kix | Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page - 1 }
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              ◀️ Prev
            </a>
          </Link>

          <p>
            Page {props.page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page + 1 }
            }}
          >
            <a className="Next" aria-disabled={page >= pages}>
              Next ▶️
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
