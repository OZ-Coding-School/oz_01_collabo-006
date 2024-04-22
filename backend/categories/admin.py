from django.contrib import admin
from categories.models import Place
from reviews.models import Review

# Register your models here.
class ReviewInline(admin.TabularInline):
  model = Review
  extra = 1

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
  search_fields = ('Place_Name','place_where1','place_where2','Category1','Category2',)
  inlines = [
    ReviewInline,
  ]
