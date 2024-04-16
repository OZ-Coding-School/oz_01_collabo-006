from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import User,Dog


# Register your models here.
@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
  list_display = ('email', 'date_joined', 'is_staff')
  list_filter = ('is_staff', 'is_superuser', 'is_active')
  fieldsets = (
      (None, {'fields': ('email', 'password')}),
      ('개인정보',{'fields':('first_name', 'last_name',)}),
      ('견종',{'fields':('dogs_size',)}),
      ('이미지필드', {'fields': ('profile_image','short_description',)}),
      ('권한', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
  )
  add_fieldsets = (
      (None, {
          'classes': ('wide',),
          'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser'),
      }),
  )
  search_fields = ('email',)
  ordering = ('email',)

@admin.register(Dog)
class DogsAdmin(admin.ModelAdmin):
    list_display = ('id', 'sizes', 'min_weight', 'max_weight')
    # list_filter = ('sizes', 'min_weight', 'max_weight')
    fieldsets = (
        (None, {'fields': ('sizes', 'min_weight', 'max_weight')}),
    )