import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import Head from "next/head"
import { InMemoryCache } from "apollo-cache-inmemory"

export const withApollo = PageComponent => {
    const WithApollo = ({ apolloClient, apolloState, ...pageProps}) => {
        const client = apolloClient || initApolloClient(apolloState)

        return (
            <ApolloProvider client={client}>
                <PageComponent {...pageProps} />
            </ApolloProvider>
        )
    }

    WithApollo.getInitialProps = async ctx => {
        const { AppTree } = ctx
        const apolloClient = ctx.apolloClient = initApolloClient()

        let pageProps = {}

        if (PageComponent.getInitialProps) {
            pageProps = await PageComponent.getInitialProps(ctx)
        }

        // If on the server
        if (typeof(window) === "undefined") {
            if (ctx.res && ctx.res.finished) {
                return pageProps
            }


            try {
                const { getDataFromTree } = await import("@apollo/react-ssr")

                await getDataFromTree(
                    <AppTree 
                        pageProps={{
                            ...pageProps,
                            apolloClient
                        }}
                    />
                )
            } catch (err) {
                console.log(err)
            }

            Head.rewind()
        }

        const apolloState = apolloClient.cache.extract()
        return {
            ...pageProps,
            apolloState
        }
    }

    return WithApollo
}

const isDev = process.env.NODE_ENV !== "production"
const url = isDev ? "http://localhost:3000" : "https://tracker.rosborne132.now.sh"

const initApolloClient = (initialState = {}) => {
    const cache = new InMemoryCache().restore(initialState)
    const client = new ApolloClient({ uri: `${url}/api/graphql`, fetch, cache })

    return client
}
