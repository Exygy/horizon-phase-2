import graphene

from django.utils import timezone

from .models import StrategyChoice, SurveyResponse


class CreateSurveyResponse(graphene.Mutation):
    error = graphene.String()
    
    class Arguments:
        name = graphene.String(required=True)
        session_id = graphene.UUID(required=True)
  
    def mutate(self, info, name, session_id):
        try:
            sr = SurveyResponse.objects.get(session_id=session_id)
            sr.name = name
            sr.date_updated = timezone.now()
            sr.save()
        except SurveyResponse.DoesNotExist:
            SurveyResponse.objects.create(
                name=name,
                session_id=session_id
            )
        return CreateSurveyResponse()


class CreateStrategyChoice(graphene.Mutation):
    error = graphene.String()
    
    class Arguments:
        origin_step_id = graphene.Int(required=True)
        step_id = graphene.Int(required=True)
        session_id = graphene.UUID(required=True)
  
    def mutate(self, info, origin_step_id, step_id, session_id):
        if step_id not in [103,104,105,204,205,308,309]:
            return CreateSurveyResponse(error="Invalid step supplied")

        try:
            sc = StrategyChoice.objects.get(session_id=session_id, origin_step_id=origin_step_id)
            sc.step_id = step_id
            sc.date_updated = timezone.now()
            sc.save()
        except StrategyChoice.DoesNotExist:
            StrategyChoice.objects.create(
                origin_step_id=origin_step_id,
                step_id=step_id,
                session_id=session_id)
        return CreateStrategyChoice()


class Mutation(object):
    create_survey_response = CreateSurveyResponse.Field()  
    create_strategy_choice = CreateStrategyChoice.Field()
