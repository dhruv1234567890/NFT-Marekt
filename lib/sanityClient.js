import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'k2lp7lg5',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'skwV6xrqqDZuWlY7gqQa9yll36gNzV2bk23UeAa8HA97ivsfXgVvGGqNaDmYIDQZKMOVzTvYQxvUod2pEUK6sXGp3Y37wthXuyBlazf2IWO5PHDoMjlmIvTNugfPBKHj3BcIHUYMIq9xUnQD3KXWoLRuJl1F6BEhZsJXWJonS6ej392lAibj',
    useCdn: false,
})