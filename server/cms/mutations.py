import graphene

from django.utils import timezone

from .models import StrategyChoice, SurveyResponse, CategoryFeedback


class CreateSurveyResponse(graphene.Mutation):
    error = graphene.String()

    class Arguments:
        zipcode = graphene.String(required=True)
        session_id = graphene.UUID(required=True)

    def mutate(self, info, zipcode, session_id):
        try:
            sr = SurveyResponse.objects.get(session_id=session_id)
            sr.zipcode = zipcode
            sr.date_updated = timezone.now()
            sr.save()
        except SurveyResponse.DoesNotExist:
            SurveyResponse.objects.create(
                zipcode=zipcode,
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


class CreateCategoryFeedback(graphene.Mutation):
    error = graphene.String()

    class Arguments:
        step_id = graphene.Int(required=True)
        session_id = graphene.UUID(required=True)
        text = graphene.String(required=True)

    def mutate(self, info, step_id, session_id, text):
        try:
            cf = CategoryFeedback.objects.get(session_id=session_id, step_id=step_id)
            cf.step_id = step_id
            cf.text = text
            cf.date_updated = timezone.now()
            cf.save()
        except CategoryFeedback.DoesNotExist:
            CategoryFeedback.objects.create(
                step_id=step_id,
                session_id=session_id,
                text=text)
        return CreateCategoryFeedback()


class Mutation(object):
    create_survey_response = CreateSurveyResponse.Field()
    create_strategy_choice = CreateStrategyChoice.Field()
    create_category_feedback = CreateCategoryFeedback.Field()
