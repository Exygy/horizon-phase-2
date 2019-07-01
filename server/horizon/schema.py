import graphene

from cms import mutations as cms_mutations, queries as cms_queries


class Query(cms_queries.Query, graphene.ObjectType):
    pass


class Mutation(cms_mutations.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
