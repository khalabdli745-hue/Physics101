#!/usr/bin/env bash
# يطبع اسم أحدث فرع معتمد approved-NNN (المرجع الثابت للمقارنة) بعد جلبه
set -e
git fetch -q origin '+refs/heads/approved-*:refs/remotes/origin/approved-*'
git for-each-ref --format='%(refname:short)' 'refs/remotes/origin/approved-*' | sort -t- -k2 -n | tail -1
