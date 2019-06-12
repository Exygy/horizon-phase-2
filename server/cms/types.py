from graphene_django.types import DjangoObjectType

import graphene
import mistune

from .models import Step as StepModel


class Step(DjangoObjectType):
    title = graphene.String()
    description = graphene.String()
    call_to_action = graphene.String()

    class Meta:
        model = StepModel

    def resolve_title(self, info):
        lang = info.context.args['lang']
        render_md_to_html = info.context.args['render_md_to_html']
        result = None

        if lang == "en":
            result = self.title_md_en
        elif lang == "es":
            result = self.title_md_es
        elif lang == "cn":
            result = self.title_md_cn

        if render_md_to_html:
            return mistune.markdown(result)
        return result

    def resolve_description(self, info):
        lang = info.context.args['lang']
        render_md_to_html = info.context.args['render_md_to_html']
        result = None

        if lang == "en":
            result = self.description_md_en
        elif lang == "es":
            result = self.description_md_es
        elif lang == "cn":
            result = self.description_md_cn

        if render_md_to_html:
            return mistune.markdown(result)
        return result

    def resolve_call_to_action(self, info):
        lang = info.context.args['lang']
        render_md_to_html = info.context.args['render_md_to_html']
        result = None

        if lang == "en":
            result = self.call_to_action_md_en
        elif lang == "es":
            result = self.call_to_action_md_es
        elif lang == "cn":
            result = self.call_to_action_md_cn

        if render_md_to_html:
            return mistune.markdown(result)
        return result
