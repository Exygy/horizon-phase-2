from graphene import ObjectType, String
from graphene_django.types import DjangoObjectType


import graphene
import mistune

from .models import Step as StepModel, StrategyChoice as StrategyChoiceModel

def process_output(context, en, es, cn):
    lang = context.args['lang']
    render_md_to_html = context.args['render_md_to_html']
    result = None

    if lang == "en":
        result = en
    elif lang == "es":
        result = es
    elif lang == "cn":
        result = cn

    if render_md_to_html and result:
        return mistune.markdown(result).replace('<p>', '').replace('</p>', '').strip('\n').replace('\n', '<br/><br/>')
    return result


class StrategyChoiceSummary(ObjectType):
    you = graphene.String()
    s1 = graphene.Float()
    s2 = graphene.Float()
    s3 = graphene.Float()

    def resolve_you(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 106:
            return StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=102).step.public_field_2_en

    def resolve_s1(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 106:
            return StrategyChoiceModel.objects.filter(step_id=103).count() / StrategyChoiceModel.objects.filter(step_id__in=[103,104,105]).count()

    def resolve_s2(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 106:
            return StrategyChoiceModel.objects.filter(step_id=104).count() / StrategyChoiceModel.objects.filter(step_id__in=[103,104,105]).count()

    def resolve_s3(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 106:
            return StrategyChoiceModel.objects.filter(step_id=105).count() / StrategyChoiceModel.objects.filter(step_id__in=[103,104,105]).count()


class Step(DjangoObjectType):
    public_field_1 = graphene.String()
    public_field_2 = graphene.String()
    public_field_3 = graphene.String()
    public_field_4 = graphene.String()
    public_field_5 = graphene.String()
    public_field_6 = graphene.String()
    public_field_7 = graphene.String()
    public_field_8 = graphene.String()
    public_field_9 = graphene.String()
    public_field_10 = graphene.String()
    public_field_11 = graphene.String()
    public_field_12 = graphene.String()
    public_field_13 = graphene.String()
    public_field_14 = graphene.String()
    public_field_15 = graphene.String()
    public_field_16 = graphene.String()
    public_field_17 = graphene.String()
    public_field_18 = graphene.String()
    public_field_19 = graphene.String()

    class Meta:
        model = StepModel

    def resolve_public_field_1(self, info):
        return process_output(
                info.context,
                self.public_field_1_en,
                self.public_field_1_es,
                self.public_field_1_cn
                )

    def resolve_public_field_2(self, info):
        return process_output(
                info.context,
                self.public_field_2_en,
                self.public_field_2_es,
                self.public_field_2_cn
                )

    def resolve_public_field_3(self, info):
        return process_output(
                info.context,
                self.public_field_3_en,
                self.public_field_3_es,
                self.public_field_3_cn
                )

    def resolve_public_field_4(self, info):
        return process_output(
                info.context,
                self.public_field_4_en,
                self.public_field_4_es,
                self.public_field_4_cn
                )

    def resolve_public_field_5(self, info):
        return process_output(
                info.context,
                self.public_field_5_en,
                self.public_field_5_es,
                self.public_field_5_cn
                )

    def resolve_public_field_6(self, info):
        return process_output(
                info.context,
                self.public_field_6_en,
                self.public_field_6_es,
                self.public_field_6_cn
                )

    def resolve_public_field_7(self, info):
        return process_output(
                info.context,
                self.public_field_7_en,
                self.public_field_7_es,
                self.public_field_7_cn
                )

    def resolve_public_field_8(self, info):
        return process_output(
                info.context,
                self.public_field_8_en,
                self.public_field_8_es,
                self.public_field_8_cn
                )

    def resolve_public_field_9(self, info):
        return process_output(
                info.context,
                self.public_field_9_en,
                self.public_field_9_es,
                self.public_field_9_cn
                )

    def resolve_public_field_10(self, info):
        return process_output(
                info.context,
                self.public_field_10_en,
                self.public_field_10_es,
                self.public_field_10_cn
                )

    def resolve_public_field_11(self, info):
        return process_output(
                info.context,
                self.public_field_11_en,
                self.public_field_11_es,
                self.public_field_11_cn
                )

    def resolve_public_field_12(self, info):
        return process_output(
                info.context,
                self.public_field_12_en,
                self.public_field_12_es,
                self.public_field_12_cn
                )

    def resolve_public_field_13(self, info):
        return process_output(
                info.context,
                self.public_field_13_en,
                self.public_field_13_es,
                self.public_field_13_cn
                )

    def resolve_public_field_14(self, info):
        return process_output(
                info.context,
                self.public_field_14_en,
                self.public_field_14_es,
                self.public_field_14_cn
                )

    def resolve_public_field_15(self, info):
        return process_output(
                info.context,
                self.public_field_15_en,
                self.public_field_15_es,
                self.public_field_15_cn
                )

    def resolve_public_field_16(self, info):
        return process_output(
                info.context,
                self.public_field_16_en,
                self.public_field_16_es,
                self.public_field_16_cn
                )

    def resolve_public_field_17(self, info):
        return process_output(
                info.context,
                self.public_field_17_en,
                self.public_field_17_es,
                self.public_field_17_cn
                )

    def resolve_public_field_18(self, info):
        return process_output(
                info.context,
                self.public_field_18_en,
                self.public_field_18_es,
                self.public_field_18_cn
                )

    def resolve_public_field_19(self, info):
        return process_output(
                info.context,
                self.public_field_19_en,
                self.public_field_19_es,
                self.public_field_19_cn
                )
