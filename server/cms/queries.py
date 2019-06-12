import graphene

from .models import Step
from .types import Step as StepType


class Query(object):
    step = graphene.Field(StepType, id=graphene.ID(), lang=graphene.String(), render_md_to_html=graphene.Boolean()) 
    
    def resolve_step(self, info, **args):
        step_id = args.get('id')
        lang = args.get('lang')
        render_md_to_html = args.get('render_md_to_html')
        info.context.args = dict(lang=lang, render_md_to_html=render_md_to_html)
        return Step.objects.get(id=step_id)
