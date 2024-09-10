from typing import Literal, TypedDict

class SuperMemoItem(TypedDict):
    interval: int
    repetition: int
    efactor: float

SuperMemoGrade = Literal[0, 1, 2, 3, 4, 5]

def supermemo(item: SuperMemoItem, grade: SuperMemoGrade) -> SuperMemoItem:
    if grade >= 3:
        if item['repetition'] == 0:
            next_interval = 1
            next_repetition = 1
        elif item['repetition'] == 1:
            next_interval = 6
            next_repetition = 2
        else:
            next_interval = round(item['interval'] * item['efactor'])
            next_repetition = item['repetition'] + 1
    else:
        next_interval = 1
        next_repetition = 0

    next_efactor = item['efactor'] + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

    if next_efactor < 1.3:
        next_efactor = 1.3

    return {
        'interval': next_interval,
        'repetition': next_repetition,
        'efactor': next_efactor
    }
