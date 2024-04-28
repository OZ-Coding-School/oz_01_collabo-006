import re
from users.models import Dog

# 견종 데이터에서 숫자 추출하는 함수
def extract_number(dog_size):
    numbers = re.findall(r'\d+', dog_size)
    if numbers:
        return int(numbers[0])  # 첫 번째 숫자 반환
    return None  # 숫자가 없으면 None 반환

# 견종 데이터에서 '~' 유무 확인하는 함수
def has_tilde(dog_size):
    return '~' in dog_size

# 견종 데이터에서 숫자와 '~' 없는 경우 소형, 중형, 대형과 같은 문자열 확인하는 함수
def is_general_size(dog_size):
    general_sizes = ['소형', '중형', '대형']
    for size in general_sizes:
        if size in dog_size:
            return True
    return False

# 플레이스와 도그의 견종 데이터 비교하여 필터링하는 함수

def filter_places_by_dog_size(places, dog_size_name):
    filtered_places = []
    
    # API에서 받은 도그 사이즈 이름으로 해당 도그 모델을 가져옵니다.
    try:
        dog = Dog.objects.get(sizes=dog_size_name)
    except Dog.DoesNotExist:
        # 해당하는 도그 사이즈 데이터가 없으면 빈 리스트 반환
        return filtered_places
    
    min_weight = dog.min_weight  # 도그 모델에서 최소무게 가져오기

    for place in places:
        place_dog_size = place.Dog_Size
        if place_dog_size == '모두 가능' or place_dog_size == '해당 없음':
            filtered_places.append(place)
        elif has_tilde(place_dog_size):
            continue  # '~' 있는 경우 제외
        elif not place_dog_size:  # 견종 데이터가 없는 경우
            filtered_places.append(place)  # 모두 가능한 경우
        else:  # 숫자가 있는 경우
            min_weight_dog_size = extract_number(place_dog_size)
            if min_weight_dog_size is not None:
                # 도그모델의 최소무게보다 클 경우만 필터링
                if min_weight_dog_size >= min_weight:  # 도그모델의 최소무게와 비교
                    filtered_places.append(place)
            else:  # 숫자가 아닌 경우
                if place_dog_size == dog_size_name:  # 문자열 비교
                    filtered_places.append(place)

    return filtered_places