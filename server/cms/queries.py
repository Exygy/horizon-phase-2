import graphene

from .models import Step
from .types import Step as StepType, StrategyChoiceSummary as StrategyChoiceSummaryType


class Query(object):
    step = graphene.Field(StepType, id=graphene.ID(), lang=graphene.String(), render_md_to_html=graphene.Boolean())
    strategy_choice_summary = graphene.Field(StrategyChoiceSummaryType, id=graphene.ID(
    ), lang=graphene.String(), session_id=graphene.UUID(), render_md_to_html=graphene.Boolean())

    def resolve_step(self, info, **args):
        step_id = args.get('id')
        lang = args.get('lang')
        render_md_to_html = args.get('render_md_to_html')
        info.context.args = dict(lang=lang, render_md_to_html=render_md_to_html)
        return Step.objects.get(id=step_id)

    def resolve_strategy_choice_summary(self, info, **args):
        step_id = int(args.get('id'))
        lang = args.get('lang')
        session_id = args.get('session_id')
        render_md_to_html = args.get('render_md_to_html')
        info.context.args = dict(step_id=step_id, session_id=session_id, lang=lang, render_md_to_html=render_md_to_html)
        return StrategyChoiceSummaryType()
