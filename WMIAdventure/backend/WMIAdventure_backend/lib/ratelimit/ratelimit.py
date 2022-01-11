from dataclasses import dataclass
from datetime import timedelta, datetime

from django.core.cache import caches


@dataclass
class RatelimitInfo:
    counter: int
    limit: int
    should_limit: bool
    expiry: datetime

    def __add__(self, other):
        if isinstance(other, int):
            self.counter += other

    def get_time_left(self):
        return abs(round((datetime.now() - self.expiry).total_seconds()))

    def as_dict(self):
        return {
            'counter': self.counter,
            'limit': self.limit,
            'should_limit': self.should_limit,
            'time_left': self.get_time_left()
        }


def get_info(key) -> RatelimitInfo or None:

    cache = caches['default']
    return cache.get(key)


def get_usage(key, limit, period, period_count=1, increment=False) -> RatelimitInfo or None:
    cache = caches['default']
    limit_info = get_info(key)
    if limit_info is None:
        timedelta_kwargs = {period: period_count}
        delta = timedelta(**timedelta_kwargs)
        expiry = datetime.now() + delta

        limit_info = RatelimitInfo(0, limit, False, expiry)

    if not increment:
        return limit_info

    if limit_info.counter >= limit_info.limit:
        limit_info.should_limit = True

    limit_info.__add__(1)
    cache.set(key, limit_info, limit_info.get_time_left())
    return limit_info

