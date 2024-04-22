from django.contrib import admin
from categories.models import Place, place_Image
from reviews.models import Review
import admin_thumbnails

# Register your models here.
@admin_thumbnails.thumbnail('place_img')
class PlaceImageInline(admin.TabularInline):
  model = place_Image
  extra = 1

class ReviewInline(admin.TabularInline):
  model = Review
  extra = 1

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
  search_fields = ('Place_Name','place_where1','place_where2','Category1','Category2',)
  inlines = [
    ReviewInline,
    PlaceImageInline,
  ]

@admin.register(place_Image)
class PlaceImageAdmin(admin.ModelAdmin):
  list_display = ('id', 'place', 'place_img')
