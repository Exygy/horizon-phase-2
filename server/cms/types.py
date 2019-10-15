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
    header_subtitle = graphene.String()
    subheader_subtitle = graphene.String()

    feedback_title = graphene.String()
    feedback_subtitle = graphene.String()
    feedback_cta = graphene.String()

    c1_title = graphene.String()
    c1_percent_agreed = graphene.Float()
    c1_s_index = graphene.Float()
    c1_s1_name = graphene.String()
    c1_s1_percentage = graphene.Float()
    c1_s2_name = graphene.String()
    c1_s2_percentage = graphene.Float()
    c1_s3_name = graphene.String()
    c1_s3_percentage = graphene.Float()
    c1_s4_name = graphene.String()
    c1_s4_percentage = graphene.Float()
    c1_s5_name = graphene.String()
    c1_s5_percentage = graphene.Float()

    c2_title = graphene.String()
    c2_s_index = graphene.Float()
    c2_percent_agreed = graphene.Float()
    c2_s1_name = graphene.String()
    c2_s1_percentage = graphene.Float()
    c2_s2_name = graphene.String()
    c2_s2_percentage = graphene.Float()
    c2_s3_name = graphene.String()
    c2_s3_percentage = graphene.Float()
    c2_s4_name = graphene.String()
    c2_s4_percentage = graphene.Float()
    c2_s5_name = graphene.String()
    c2_s5_percentage = graphene.Float()

    c3_title = graphene.String()
    c3_s_index = graphene.Float()
    c3_percent_agreed = graphene.Float()
    c3_s1_name = graphene.String()
    c3_s1_percentage = graphene.Float()
    c3_s2_name = graphene.String()
    c3_s2_percentage = graphene.Float()
    c3_s3_name = graphene.String()
    c3_s3_percentage = graphene.Float()
    c3_s4_name = graphene.String()
    c3_s4_percentage = graphene.Float()

    def resolve_feedback_title(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_6_en,
            step.public_field_6_es,
            step.public_field_6_cn
        )

    def resolve_feedback_subtitle(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_7_en,
            step.public_field_7_es,
            step.public_field_7_cn
        )

    def resolve_feedback_cta(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_8_en,
            step.public_field_8_es,
            step.public_field_8_cn
        )

    def resolve_header_subtitle(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_1_en,
            step.public_field_1_es,
            step.public_field_1_cn
        )

    def resolve_subheader_subtitle(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_2_en,
            step.public_field_2_es,
            step.public_field_2_cn
        )

    def resolve_c1_title(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_3_en,
            step.public_field_3_es,
            step.public_field_3_cn
        )

    def resolve_c1_s_index(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=102).step
                if your_step.id == 103:
                    return 0
                if your_step.id == 104:
                    return 1
                if your_step.id == 105:
                    return 2
                if your_step.id == 107:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 406:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=507).step
                if your_step.id == 508:
                    return 0
                if your_step.id == 509:
                    return 1
                if your_step.id == 510:
                    return 2
                if your_step.id == 512:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=703).step
                if your_step.id == 704:
                    return 0
                if your_step.id == 705:
                    return 1
                if your_step.id == 707:
                    return 2
                if your_step.id == 706:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=1005).step
                if your_step.id == 1006:
                    return 0
                if your_step.id == 1007:
                    return 1
                if your_step.id == 1008:
                    return 2
                if your_step.id == 1010:
                    return 3
                if your_step.id == 1009:
                    return 4
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

    def resolve_c1_percent_agreed(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=102).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[103, 104, 105, 107]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
            except ZeroDivisionError:
                return 0

        elif step_id == 406:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=507).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[508, 509, 510, 512]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
            except ZeroDivisionError:
                return 0

        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=703).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[704, 705, 706, 707]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
            except ZeroDivisionError:
                return 0

        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=1005).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
            except ZeroDivisionError:
                return 0

    def resolve_c1_s1_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=102)
        elif step_id == 406:
            step = StepModel.objects.get(id=507)
        elif step_id == 610:
            step = StepModel.objects.get(id=703)
        elif step_id == 909:
            step = StepModel.objects.get(id=1005)

        return process_output(
            info.context,
            step.public_field_2_en,
            step.public_field_2_es,
            step.public_field_2_cn
        )

    def resolve_c1_s1_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=103).count() / StrategyChoiceModel.objects.filter(step_id__in=[103, 104, 105, 107]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=508).count() / StrategyChoiceModel.objects.filter(step_id__in=[508, 509, 510, 512]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=704).count() / StrategyChoiceModel.objects.filter(step_id__in=[704, 705, 706, 707]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1006).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c1_s2_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=102)
        elif step_id == 406:
            step = StepModel.objects.get(id=507)
        elif step_id == 610:
            step = StepModel.objects.get(id=703)
        elif step_id == 909:
            step = StepModel.objects.get(id=1005)

        return process_output(
            info.context,
            step.public_field_8_en,
            step.public_field_8_es,
            step.public_field_8_cn
        )

    def resolve_c1_s2_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=104).count() / StrategyChoiceModel.objects.filter(step_id__in=[103, 104, 105, 107]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=509).count() / StrategyChoiceModel.objects.filter(step_id__in=[508, 509, 510, 512]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=705).count() / StrategyChoiceModel.objects.filter(step_id__in=[704, 705, 706, 707]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1007).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c1_s3_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=102)
        elif step_id == 406:
            step = StepModel.objects.get(id=507)
        elif step_id == 610:
            step = StepModel.objects.get(id=703)
        elif step_id == 909:
            step = StepModel.objects.get(id=1005)

        return process_output(
            info.context,
            step.public_field_14_en,
            step.public_field_14_es,
            step.public_field_14_cn
        )

    def resolve_c1_s3_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=105).count() / StrategyChoiceModel.objects.filter(step_id__in=[103, 104, 105, 107]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=510).count() / StrategyChoiceModel.objects.filter(step_id__in=[508, 509, 510, 512]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=707).count() / StrategyChoiceModel.objects.filter(step_id__in=[704, 705, 706, 707]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1008).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c1_s4_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=102)
        elif step_id == 406:
            step = StepModel.objects.get(id=507)
        elif step_id == 610:
            step = StepModel.objects.get(id=703)
        elif step_id == 909:
            step = StepModel.objects.get(id=1005)

        return process_output(
            info.context,
            step.public_field_20_en,
            step.public_field_20_es,
            step.public_field_20_cn
        )

    def resolve_c1_s4_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=107).count() / StrategyChoiceModel.objects.filter(step_id__in=[103, 104, 105, 107]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=512).count() / StrategyChoiceModel.objects.filter(step_id__in=[508, 509, 510, 512]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=706).count() / StrategyChoiceModel.objects.filter(step_id__in=[704, 705, 706, 707]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1010).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c1_s5_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            return None
        elif step_id == 406:
            return None
        elif step_id == 610:
            return None
        elif step_id == 909:
            step = StepModel.objects.get(id=1005)

        return process_output(
            info.context,
            step.public_field_25_en,
            step.public_field_25_es,
            step.public_field_25_cn
        )

    def resolve_c1_s5_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return 0
            elif step_id == 406:
                return 0
            elif step_id == 610:
                return 0
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1009).count() / StrategyChoiceModel.objects.filter(step_id__in=[1006, 1007, 1008, 1009, 1010]).count()
        except ZeroDivisionError:
            return 0

    # -----

    def resolve_c2_s_index(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=307).step
                if your_step.id == 308:
                    return 0
                if your_step.id == 309:
                    return 1
                if your_step.id == 312:
                    return 2
                if your_step.id == 311:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 406:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=403).step
                if your_step.id == 404:
                    return 0
                if your_step.id == 405:
                    return 1
                if your_step.id == 408:
                    return 2
                if your_step.id == 407:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=805).step
                if your_step.id == 806:
                    return 0
                if your_step.id == 807:
                    return 1
                if your_step.id == 808:
                    return 2
                if your_step.id == 810:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=1105).step
                if your_step.id == 1106:
                    return 0
                if your_step.id == 1107:
                    return 1
                if your_step.id == 1108:
                    return 2
                if your_step.id == 1111:
                    return 3
                if your_step.id == 1110:
                    return 4
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

    def resolve_c2_title(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_4_en,
            step.public_field_4_es,
            step.public_field_4_cn
        )

    def resolve_c2_percent_agreed(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=307).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[308, 309, 311, 312]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0

        elif step_id == 406:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=403).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[404, 405, 407, 408]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0

        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=805).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[806, 807, 808, 810]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0

        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=1105).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0

    def resolve_c2_s1_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=307)
        elif step_id == 406:
            step = StepModel.objects.get(id=403)
        elif step_id == 610:
            step = StepModel.objects.get(id=805)
        elif step_id == 909:
            step = StepModel.objects.get(id=1105)
        return process_output(
            info.context,
            step.public_field_2_en,
            step.public_field_2_es,
            step.public_field_2_cn
        )

    def resolve_c2_s1_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=308).count() / StrategyChoiceModel.objects.filter(step_id__in=[308, 309, 311, 312]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=404).count() / StrategyChoiceModel.objects.filter(step_id__in=[404, 405, 407, 408]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=806).count() / StrategyChoiceModel.objects.filter(step_id__in=[806, 807, 808, 810]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1106).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c2_s2_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=307)
        elif step_id == 406:
            step = StepModel.objects.get(id=403)
        elif step_id == 610:
            step = StepModel.objects.get(id=805)
        elif step_id == 909:
            step = StepModel.objects.get(id=1105)
        return process_output(
            info.context,
            step.public_field_8_en,
            step.public_field_8_es,
            step.public_field_8_cn
        )

    def resolve_c2_s2_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=309).count() / StrategyChoiceModel.objects.filter(step_id__in=[308, 309, 311, 312]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=405).count() / StrategyChoiceModel.objects.filter(step_id__in=[404, 405, 407, 408]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=807).count() / StrategyChoiceModel.objects.filter(step_id__in=[806, 807, 808, 810]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1107).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c2_s3_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=307)
        elif step_id == 406:
            step = StepModel.objects.get(id=403)
        elif step_id == 610:
            step = StepModel.objects.get(id=805)
        elif step_id == 909:
            step = StepModel.objects.get(id=1105)
        return process_output(
            info.context,
            step.public_field_14_en,
            step.public_field_14_es,
            step.public_field_14_cn
        )

    def resolve_c2_s3_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=312).count() / StrategyChoiceModel.objects.filter(step_id__in=[308, 309, 311, 312]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=408).count() / StrategyChoiceModel.objects.filter(step_id__in=[404, 405, 407, 408]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=808).count() / StrategyChoiceModel.objects.filter(step_id__in=[806, 807, 808, 810]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1108).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c2_s4_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=307)
        elif step_id == 406:
            step = StepModel.objects.get(id=403)
        elif step_id == 610:
            step = StepModel.objects.get(id=805)
        elif step_id == 909:
            step = StepModel.objects.get(id=1105)
        return process_output(
            info.context,
            step.public_field_20_en,
            step.public_field_20_es,
            step.public_field_20_cn
        )

    def resolve_c2_s4_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=311).count() / StrategyChoiceModel.objects.filter(step_id__in=[308, 309, 311, 312]).count()
            elif step_id == 406:
                return StrategyChoiceModel.objects.filter(step_id=407).count() / StrategyChoiceModel.objects.filter(step_id__in=[404, 405, 407, 408]).count()
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=810).count() / StrategyChoiceModel.objects.filter(step_id__in=[806, 807, 808, 810]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1111).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c2_s5_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            return None
        elif step_id == 406:
            return None
        elif step_id == 610:
            return None
        elif step_id == 909:
            step = StepModel.objects.get(id=1105)
        return process_output(
            info.context,
            step.public_field_25_en,
            step.public_field_25_es,
            step.public_field_25_cn
        )

    def resolve_c2_s5_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return 0
            elif step_id == 406:
                return 0
            elif step_id == 610:
                return 0
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=1110).count() / StrategyChoiceModel.objects.filter(step_id__in=[1106, 1107, 1108, 1110, 1111]).count()
        except ZeroDivisionError:
            return 0

    # -----

    def resolve_c3_title(self, info):
        step_id = info.context.args['step_id']
        step = StepModel.objects.get(id=step_id)

        return process_output(
            info.context,
            step.public_field_5_en,
            step.public_field_5_es,
            step.public_field_5_cn
        )

    def resolve_c3_percent_agreed(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=203).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[204, 205, 208, 209]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
        elif step_id == 406:
            return 0
        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=607).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[608, 609, 611]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0
        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=905).step
                return StrategyChoiceModel.objects.filter(step_id=your_step).count() / StrategyChoiceModel.objects.filter(step_id__in=[906, 907, 908, 910]).count()
            except StrategyChoiceModel.DoesNotExist:
                return 0

    def resolve_c3_s_index(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        if step_id == 206:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=203).step
                if your_step.id == 204:
                    return 0
                if your_step.id == 205:
                    return 1
                if your_step.id == 209:
                    return 2
                if your_step.id == 208:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1
        elif step_id == 406:
            return 0
        elif step_id == 610:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=607).step
                if your_step.id == 608:
                    return 0
                elif your_step.id == 609:
                    return 1
                elif your_step.id == 611:
                    return 2
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1
        elif step_id == 909:
            try:
                your_step = StrategyChoiceModel.objects.get(session_id=session_id, origin_step_id=905).step
                if your_step.id == 906:
                    return 0
                elif your_step.id == 907:
                    return 1
                elif your_step.id == 908:
                    return 2
                elif your_step.id == 910:
                    return 3
                return -1
            except StrategyChoiceModel.DoesNotExist:
                return -1

    def resolve_c3_s1_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=203)
        elif step_id == 406:
            return None
        elif step_id == 610:
            step = StepModel.objects.get(id=607)
        elif step_id == 909:
            step = StepModel.objects.get(id=905)
        return process_output(
            info.context,
            step.public_field_2_en,
            step.public_field_2_es,
            step.public_field_2_cn
        )

    def resolve_c3_s1_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=204).count() / StrategyChoiceModel.objects.filter(step_id__in=[204, 205, 208, 209]).count()
            elif step_id == 406:
                return 0
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=608).count() / StrategyChoiceModel.objects.filter(step_id__in=[608, 609, 611]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=906).count() / StrategyChoiceModel.objects.filter(step_id__in=[906, 907, 908, 910]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c3_s2_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=203)
        elif step_id == 406:
            return None
        elif step_id == 610:
            step = StepModel.objects.get(id=607)
        elif step_id == 909:
            step = StepModel.objects.get(id=905)
        return process_output(
            info.context,
            step.public_field_8_en,
            step.public_field_8_es,
            step.public_field_8_cn
        )

    def resolve_c3_s2_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=205).count() / StrategyChoiceModel.objects.filter(step_id__in=[204, 205, 208, 209]).count()
            elif step_id == 406:
                return 0
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=609).count() / StrategyChoiceModel.objects.filter(step_id__in=[608, 609, 611]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=907).count() / StrategyChoiceModel.objects.filter(step_id__in=[906, 907, 908, 910]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c3_s3_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=203)
        elif step_id == 406:
            return None
        elif step_id == 610:
            step = StepModel.objects.get(id=607)
        elif step_id == 909:
            step = StepModel.objects.get(id=905)

        return process_output(
            info.context,
            step.public_field_14_en,
            step.public_field_14_es,
            step.public_field_14_cn
        )

    def resolve_c3_s3_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=209).count() / StrategyChoiceModel.objects.filter(step_id__in=[204, 205, 208, 209]).count()
            elif step_id == 406:
                return None
            elif step_id == 610:
                return StrategyChoiceModel.objects.filter(step_id=611).count() / StrategyChoiceModel.objects.filter(step_id__in=[608, 609, 611]).count()
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=908).count() / StrategyChoiceModel.objects.filter(step_id__in=[906, 907, 908, 910]).count()
        except ZeroDivisionError:
            return 0

    def resolve_c3_s4_name(self, info):
        step_id = info.context.args['step_id']

        if step_id == 206:
            step = StepModel.objects.get(id=203)
        elif step_id == 406:
            return None
        elif step_id == 610:
            return None
        elif step_id == 909:
            step = StepModel.objects.get(id=905)

        return process_output(
            info.context,
            step.public_field_20_en,
            step.public_field_20_es,
            step.public_field_20_cn
        )

    def resolve_c3_s4_percentage(self, info):
        step_id = info.context.args['step_id']
        session_id = info.context.args['session_id']

        try:
            if step_id == 206:
                return StrategyChoiceModel.objects.filter(step_id=208).count() / StrategyChoiceModel.objects.filter(step_id__in=[204, 205, 208, 209]).count()
            elif step_id == 406:
                return None
            elif step_id == 610:
                return None
            elif step_id == 909:
                return StrategyChoiceModel.objects.filter(step_id=910).count() / StrategyChoiceModel.objects.filter(step_id__in=[906, 907, 908, 910]).count()
        except ZeroDivisionError:
            return 0


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
    public_field_20 = graphene.String()
    public_field_21 = graphene.String()
    public_field_22 = graphene.String()
    public_field_23 = graphene.String()
    public_field_24 = graphene.String()
    public_field_25 = graphene.String()
    public_field_26 = graphene.String()
    public_field_27 = graphene.String()
    public_field_28 = graphene.String()
    public_field_29 = graphene.String()

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

    def resolve_public_field_20(self, info):
        return process_output(
            info.context,
            self.public_field_20_en,
            self.public_field_20_es,
            self.public_field_20_cn
        )

    def resolve_public_field_21(self, info):
        return process_output(
            info.context,
            self.public_field_21_en,
            self.public_field_21_es,
            self.public_field_21_cn
        )

    def resolve_public_field_22(self, info):
        return process_output(
            info.context,
            self.public_field_22_en,
            self.public_field_22_es,
            self.public_field_22_cn
        )

    def resolve_public_field_23(self, info):
        return process_output(
            info.context,
            self.public_field_23_en,
            self.public_field_23_es,
            self.public_field_23_cn
        )

    def resolve_public_field_24(self, info):
        return process_output(
            info.context,
            self.public_field_24_en,
            self.public_field_24_es,
            self.public_field_24_cn
        )

    def resolve_public_field_25(self, info):
        return process_output(
            info.context,
            self.public_field_25_en,
            self.public_field_25_es,
            self.public_field_25_cn
        )

    def resolve_public_field_26(self, info):
        return process_output(
            info.context,
            self.public_field_26_en,
            self.public_field_26_es,
            self.public_field_26_cn
        )

    def resolve_public_field_27(self, info):
        return process_output(
            info.context,
            self.public_field_27_en,
            self.public_field_27_es,
            self.public_field_27_cn
        )

    def resolve_public_field_28(self, info):
        return process_output(
            info.context,
            self.public_field_28_en,
            self.public_field_28_es,
            self.public_field_28_cn
        )

    def resolve_public_field_29(self, info):
        return process_output(
            info.context,
            self.public_field_29_en,
            self.public_field_29_es,
            self.public_field_29_cn
        )
