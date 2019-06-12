import graphene

from cms import queries as cms_queries


class Query(cms_queries.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
